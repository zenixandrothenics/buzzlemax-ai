import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { PageLoader } from '@/components/common/PageLoader'
import { ScrollManager } from '@/components/common/ScrollManager'
import { ThemeProvider } from '@/hooks/use-theme'

const LandingPage = React.lazy(async () => {
  const module = await import('@/pages/LandingPage')
  return { default: module.LandingPage }
})

const WebDevelopmentPage = React.lazy(async () => {
  const module = await import('@/pages/WebDevelopmentPage')
  return { default: module.WebDevelopmentPage }
})

const ChatWidget = React.lazy(() => import('@/components/ChatWidget'))

function App() {
  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/web-development" element={<WebDevelopmentPage />} />
        </Routes>
      </React.Suspense>
      <React.Suspense fallback={null}>
        <ChatWidget />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default App
