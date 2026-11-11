// Browser-safe types (shared with sales-engine on the server)
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  message: string
  leadCaptureRecommended: boolean
  isFallback?: boolean
  quickActions?: QuickAction[]
}

export interface QuickAction {
  label: string
  prompt: string
}

// Health state for cooldown mechanism
let consecutiveFailures = 0
let lastFailureTime = 0
let isCooldownMode = false
const COOLDOWN_DURATION = 60000 // 1 minute cooldown
const MAX_CONSECUTIVE_FAILURES = 3 // Enter cooldown after 3 failures
const REQUEST_TIMEOUT = 30000 // 30 second timeout (Worker allows up to 25s per provider)

// ────────────────────────────────────────────────────────────────
// Layer 1: Gemini API with retry logic
// ────────────────────────────────────────────────────────────────
async function callGeminiAPI(messages: ChatMessage[]): Promise<ChatResponse> {
  const apiEndpoint = import.meta.env.VITE_CHAT_API_URL || 
    'https://buzzlemax-ai-worker.swapnanildowarah10.workers.dev/api/chat'
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  
  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (res.ok) {
      const data = (await res.json()) as ChatResponse
      if (data && typeof data.message === 'string') {
        // Reset failure counter on success
        consecutiveFailures = 0
        isCooldownMode = false
        return data
      }
    } else {
      // Handle structured error responses from Worker
      const errorData = await res.json().catch(() => ({}))
      if (errorData.error) {
        throw new Error(`Worker error: ${errorData.error}`)
      }
      throw new Error(`HTTP ${res.status}`)
    }
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
  
  throw new Error('Invalid response from API')
}

// ────────────────────────────────────────────────────────────────
// Main API caller with Layer 1 retry + honest error handling
// ────────────────────────────────────────────────────────────────
export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  // Check if we're in cooldown mode
  if (isCooldownMode) {
    const now = Date.now()
    if (now - lastFailureTime < COOLDOWN_DURATION) {
      if (import.meta.env.DEV) {
        console.warn('[BuzzleMax Chat] In cooldown mode, returning unavailable message')
      }
      return {
        message: "Sorry, the AI is temporarily unavailable. Please try again in a moment.",
        leadCaptureRecommended: true,
      }
    } else {
      // Cooldown expired, try API again
      isCooldownMode = false
      consecutiveFailures = 0
    }
  }

  // Layer 1: Call Cloudflare Worker API with retry
  for (let attempt = 0; attempt <= 1; attempt++) {
    try {
      if (import.meta.env.DEV && attempt > 0) {
        console.warn('[BuzzleMax Chat] Retrying Chat API (attempt 2)')
      }
      
      const response = await callGeminiAPI(messages)
      return response
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`[BuzzleMax Chat] API attempt ${attempt + 1} failed:`, error)
      }
      
      // Only retry on specific transient errors
      const shouldRetry = error instanceof Error && (
        error.message.includes('429') ||
        error.message.includes('500') ||
        error.message.includes('502') ||
        error.message.includes('503') ||
        error.message.includes('504') ||
        error.message.includes('timeout') ||
        error.message.includes('AbortError') ||
        error.message.includes('fetch')
      )
      
      if (!shouldRetry || attempt === 1) {
        break
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  // Track failure for cooldown
  consecutiveFailures++
  lastFailureTime = Date.now()
  
  if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
    isCooldownMode = true
    if (import.meta.env.DEV) {
      console.warn('[BuzzleMax Chat] Entering cooldown mode after multiple failures')
    }
  }

  // When API is unavailable, return honest error message instead of fake hardcoded answers
  return {
    message: "Sorry, the AI is temporarily unavailable. Please try again in a moment.",
    leadCaptureRecommended: true,
  }
}
