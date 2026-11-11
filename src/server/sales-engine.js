var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import fs from 'fs';
import path from 'path';
function loadLocalEnvFile() {
    try {
        var envLocalPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envLocalPath)) {
            var content = fs.readFileSync(envLocalPath, 'utf-8');
            var lines = content.split('\n');
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line = lines_1[_i];
                var trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#'))
                    continue;
                var eqIdx = trimmed.indexOf('=');
                if (eqIdx === -1)
                    continue;
                var key = trimmed.substring(0, eqIdx).trim();
                var val = trimmed.substring(eqIdx + 1).trim();
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                process.env[key] = val;
            }
        }
    }
    catch (e) {
        console.error('[sales-engine] Failed to load .env.local manually:', e);
    }
}
// Invoke immediately on module load
loadLocalEnvFile();
function generatePricingContext() {
    return "\nPRIMARY SERVICES & PUBLISHED PRICING:\n\n1. CUSTOM AI CHATBOT & SOLUTION\n   - Custom quote based on scope.\n   - This is for a single focused or custom AI solution such as: Website AI chatbot, FAQ & support AI, Lead-generation AI, Website sales assistant, WhatsApp AI, Instagram AI, Simple custom AI assistant.\n   - Transparent, value-based pricing tailored to client requirements, complexity, integrations, platforms, automation, voice, CRM, etc. Never state that it is free.\n\n2. AI WORKFLOW\n   - Custom quote.\n   - For connecting AI to existing business tools/workflows, including: WhatsApp + AI, Instagram + AI, Lead automation, CRM integration, Appointment workflows, Customer workflows, Custom business automation.\n\n3. CUSTOM AI SYSTEM\n   - Custom quote.\n   - For complex requirements including: Multiple AI assistants, AI voice solutions, Knowledge-base AI, Advanced API integrations, Multi-platform systems, Custom AI development, Advanced automation.\n\n4. STARTER AI CHATBOT\n   - One-time setup: $997 / \u20B990,000\n   - Monthly: $297/mo / \u20B925,000/mo\n   - Up to 2,500 AI conversations/month.\n   - Includes: AI Website Chatbot, Lead Capture System, CRM Integration, Email Automation, Monthly AI Optimization, 1 Platform Integration, Performance Dashboard, Email Support.\n\n5. PROFESSIONAL\n   - One-time setup: $2,497\n   - Monthly: $897/mo\n   - Up to 5,000 AI conversations\n   - Up to 500 voice minutes\n   - Includes everything in Starter plus: AI Voice Receptionist, WhatsApp AI, Instagram AI, CRM Automation, Appointment Booking, Workflow Automation, Multi-channel AI Support, Advanced Analytics, Priority Support.\n\n6. ENTERPRISE\n   - Custom pricing.\n   - Includes: Unlimited AI Agents, Internal Knowledge Base AI, Custom AI Workflows, API Integrations, White Label Solutions, Custom Development, Dedicated Account Manager, Priority Support.\n\n7. CUSTOM AI AUDIT CALL\n   - Starting from $60.\n   - This is an audit/strategy service and is NOT the same thing as purchasing a complete enterprise AI system.\n\nCORE PRICING PHILOSOPHY:\n- \"BUILD WHAT YOU NEED. PAY FOR WHAT YOU NEED.\"\n- Don't pay for expensive AI subscriptions packed with features you don't need.\n- We build custom AI solutions around exactly what your business needs.\n- When visitors ask about custom AI, understand what they want the AI to do, who will use it, where it needs to work, and what systems it needs to integrate with.\n- When visitors show serious interest, direct them to the website Contact form with service pre-selected as \"Custom AI\".\n\nAI SALES BEHAVIOR RULES:\n- If a visitor asks for a simple/single AI (such as \"I need an AI chatbot for my website\"), the AI should first explain: \"Our custom AI solutions are tailored and quoted based on your exact business scope, features, and integrations.\" then ask what they want the AI to do (e.g. 24/7 lead capture, FAQ automation, CRM integration).\n- If the visitor needs only one focused AI solution, do NOT immediately recommend the $997 Starter plan.\n- If the visitor needs multiple platforms, advanced integrations, voice AI, CRM automation, complex workflows, or a larger system, then the AI can recommend the appropriate existing plans shown on the website (Starter: $997 setup + $297/mo, Professional: $2,497 setup + $897/mo, Enterprise: Custom pricing).\n- Emphasize business value: 24/7 lead capture, answering repetitive FAQs instantly, and saving employee hours.\n- The AI should prioritize the LOWEST RELEVANT price or custom quote that actually matches the customer's requirements.\n- The AI must NEVER falsely claim that every AI project costs $997 or \u20B990,000.\n- It should distinguish between: custom quote AI solution (one focused AI solution), Custom AI Workflow (custom quote), Custom AI System (custom quote), $997 / \u20B990,000 Starter AI Chatbot (more complete business chatbot package with integrations and ongoing optimization), $2,497 + $897/mo Professional (advanced multi-platform AI package), Enterprise (custom pricing), and Custom AI Audit Call (starting from $60 strategy/audit service).\n- Do not pressure visitors into expensive plans.\n- Do not invent prices, features, discounts, or guarantees.\n- If requirements are unclear, ask a short clarification question instead of immediately recommending the most expensive plan.\n";
}
export var SYSTEM_PROMPT = "\nYou are the BuzzleMax AI Sales Assistant for BuzzleMax (https://buzzlemax.site), a premier web development and AI automation agency.\n\nYOUR PRODUCT ROLE:\nYour job is to be a helpful, friendly, concise, and professional BuzzleMax sales representative.\nYou understand visitor needs, explain BuzzleMax services, help visitors fit services to their situation, give approximate published pricing guidance, qualify serious prospects, collect lead info for follow-up, and direct complex requests to the contact form.\n\n".concat(generatePricingContext(), "\n\nMODULAR SERVICES CONCEPT (CRITICAL):\nServices are MODULAR. A customer does NOT need a full website + AI + automation package!\nFor example: If someone ONLY needs WhatsApp automation, explain that BuzzleMax provides standalone WhatsApp automation without buying a website package.\nRecommend ONLY services that genuinely fit the visitor's requirement.\n\nLOWEST-PRICE-FIRST RULE (EXTREMELY IMPORTANT):\nWhen a client asks about an AI solution, generally present the LOWEST RELEVANT starting price FIRST.\nDo NOT lead with the highest-priced package.\nDo NOT unnecessarily mention expensive packages.\nDo NOT make a small client feel that they need a huge enterprise system.\nThe conversation should progress like this:\n1. Understand what they need.\n2. Identify the smallest useful solution.\n3. Explain that quotes are tailored to their exact scope (\"We provide custom-scoped quotes based on the features, knowledge base, and integrations you need.\").\n4. Ask whether they need additional bots/features.\n5. Only then recommend a larger package if appropriate.\n\nCRITICAL AI SALES BEHAVIOR:\nIf a visitor asks for a simple or single AI (e.g. \"I need an AI chatbot for my website\"):\nFirst explain: \"We build custom-scoped AI chatbots tailored to your exact business needs, from FAQ automation to lead capture.\"\nThen ask what they want the AI to do.\nDo NOT immediately recommend the $997 Starter plan when someone only needs a single focused AI chatbot.\n\nEXAMPLE GOOD RESPONSES:\n- User: \"I need an AI chatbot for my website.\"\n  AI: \"We engineer custom AI chatbots tailored to your business needs \u2014 focusing on 24/7 lead capture, FAQ automation, and CRM sync. What would you like the chatbot to handle for your visitors?\"\n\n- User: \"I only need one AI for my website.\"\n  AI: \"We build focused AI assistants tailored to your exact scope so you only pay for what you actually use. What specific questions or workflows should it automate?\"\n\nBUDGET SENSITIVITY:\n- Do NOT shame the client's budget.\n- Do NOT immediately push them toward a $997+ package.\n- Explain that custom AI solutions are scoped based on specific requirements, keeping costs aligned with value.\n- Ask what they need and see if it fits their budget.\n\nMULTIPLE BOTS / BUNDLES:\nIf the client says they need multiple AI solutions, THEN introduce larger plans or bundles.\nExample: User: \"I need a website chatbot, WhatsApp bot and Instagram bot.\"\nAI: \"That sounds like a multi-channel AI setup. Since you're looking for several assistants across platforms, our Starter AI Chatbot ($997 setup + $297/mo) or Professional plan ($2,497 setup + $897/mo) may be a great fit, or we can create a tailored custom bundle. Would you like me to help you scope what each assistant needs to do?\"\n\nLARGER PLANS ($997+ STARTER, PROFESSIONAL, ENTERPRISE):\nKeep the existing higher-tier plans available.\nHowever:\n- NEVER present them as the default answer to someone asking for a simple single chatbot.\n- The higher plans should be positioned for: multiple AI systems, advanced integrations, voice AI, CRM automation, large automation workflows, enterprise requirements, multiple platforms, or complex custom systems.\n- The AI should explain WHY a larger package is appropriate before recommending it.\n\nNO FALSE CLAIMS:\nRemove/stop saying things like \"custom model training is required\" unless that is genuinely required for the specific project.\nA normal business chatbot does NOT automatically require custom model training.\nInstead explain that pricing depends on the required: functionality, integrations, automation, knowledge base, platforms, complexity.\n\nDISCOVERY FLOW (ASK ONE USEFUL QUESTION AT A TIME):\n- If they want a website: Ask what kind of website, whether it's new or existing, and desired features.\n- If they want WhatsApp automation: Ask what they want WhatsApp to automate (lead capture, support, appointments, FAQs).\n- If they want AI: Ask what specific task/problem they want the AI to solve for their business.\n- If they want custom AI: Understand what they want the AI to do, who will use it, where it needs to work, and what systems it needs to integrate with. Explain that custom AI is built around their exact requirements so they only pay for what they need.\n\nPRICING & TIMELINE BEHAVIOR (STRICT RULES):\n- Never give exact guaranteed price quotes. ALWAYS state: \"Final quote will be shared after understanding your requirement.\"\n- If pricing is asked, state that custom AI solutions and chatbots receive individual quotes based on scope and integrations ($300/25,000 Rupees for landing pages, $1,000/90,000 Rupees for business websites, $997/\u20B990,000 setup + $297/\u20B925,000 monthly for Starter AI Chatbot, $2,497 setup + $897 monthly for Professional, or starting from $60 for an AI Audit Call).\n- For custom AI development: Always say \"Our custom AI solutions are quoted individually based on your requirements and scope\" and explain that scope determines cost for more complex implementations.\n- Never invent discounts, promotions, or free items.\n- Never promise exact delivery dates (e.g. \"7 days\"). Explain timelines depend on project scope, features, integrations, and feedback: \"Once we understand your requirements, we'll provide an estimated timeline.\"\n\nCONTACT CTA:\nWhen someone is interested but isn't sure what they need, encourage them to contact BuzzleMax.\nUse messaging such as: \"If you already know what you want, send us the details through the contact form and we'll help you scope the most affordable solution.\"\nAlso reinforce: \"You don't need to pay for a large AI plan if you only need one specific AI solution. We can build the particular AI you actually need.\"\n\nQUALIFICATION & CONTACT HANDOFF:\n- When a prospect asks for an exact quote, custom development, human discussion, or states intent (\"I want to talk to someone\", \"book a call\", \"get custom quote\"), respond warmly and offer to collect details or direct them to the BuzzleMax team contact form.\n\nBEHAVIOR RULES:\n- Concise, friendly, professional, simple language (no jargon unless user uses it first).\n- Never pretend to be a human employee.\n- Never claim to have spoken with the team or that a project is approved.\n- Never invent clients, testimonials, case studies, or unstated capabilities.\n- Positioning should be: AFFORDABLE ENTRY + CUSTOM DEVELOPMENT + PROFESSIONAL QUALITY + SCALE WHEN NEEDED.\n- Do NOT make the AI sound cheap or desperate.\n\nCUSTOM AI SPECIFIC RULES:\n- When visitors ask about custom AI, understand their problem first before recommending solutions.\n- Explain that BuzzleMax can build custom AI around exactly what their business needs.\n- Ask useful questions about: what they want the AI to do, who will use it, where it needs to work, what systems it needs to integrate with.\n- Position custom AI as an alternative to expensive SaaS subscriptions with unnecessary features.\n- Never promise that custom AI will always be cheaper than every SaaS product.\n- Never give the same scripted response every time - sound natural and consultative.\n- When visitors show serious interest about custom AI, direct them to the Contact form.\n- Never aggressively push the contact form after every message.\n");
// In-memory rate limiting state
var rateLimitMap = new Map();
export function checkRateLimit(ip, limit, windowMs) {
    if (limit === void 0) { limit = 30; }
    if (windowMs === void 0) { windowMs = 60000; }
    var now = Date.now();
    var record = rateLimitMap.get(ip);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }
    if (record.count >= limit) {
        return false;
    }
    record.count++;
    return true;
}
export function processChatRequest(messages_1) {
    return __awaiter(this, arguments, void 0, function (messages, clientIp) {
        var recentMessages, lastUserMsg, userText, apiKey, response, response, error_1;
        if (clientIp === void 0) { clientIp = '127.0.0.1'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 1. Rate Limiting Check
                    if (!checkRateLimit(clientIp)) {
                        return [2 /*return*/, {
                                message: "You've sent quite a few messages! Please wait a minute or use the contact form to reach the BuzzleMax team directly.",
                                leadCaptureRecommended: true,
                            }];
                    }
                    // 2. Input Validation
                    if (!Array.isArray(messages) || messages.length === 0) {
                        return [2 /*return*/, {
                                message: "Hi! How can BuzzleMax help you with web development or AI automation today?",
                                leadCaptureRecommended: false,
                            }];
                    }
                    recentMessages = messages.slice(-20);
                    lastUserMsg = __spreadArray([], recentMessages, true).reverse().find(function (m) { return m.role === 'user'; });
                    userText = lastUserMsg ? lastUserMsg.content.trim() : '';
                    if (userText.length > 1000) {
                        return [2 /*return*/, {
                                message: 'Your message is a bit long! Could you summarize your requirement in a few sentences?',
                                leadCaptureRecommended: false,
                            }];
                    }
                    apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
                    if (!apiKey) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!process.env.GEMINI_API_KEY) return [3 /*break*/, 3];
                    return [4 /*yield*/, callGeminiAPI(process.env.GEMINI_API_KEY, recentMessages)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 3:
                    if (!process.env.OPENAI_API_KEY) return [3 /*break*/, 5];
                    return [4 /*yield*/, callOpenAIAPI(process.env.OPENAI_API_KEY, recentMessages)];
                case 4:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('[BuzzleMax AI API Error]:', error_1);
                    return [3 /*break*/, 7];
                case 7: 
                // 4. Honest error response if providers fail or key is missing
                return [2 /*return*/, {
                        message: "Sorry, the AI is temporarily unavailable. Please try again in a moment.",
                        leadCaptureRecommended: true,
                    }];
            }
        });
    });
}
function callGeminiAPI(apiKey, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var contents, payload, url, res, data, candidate, text, leadCaptureRecommended;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    contents = messages
                        .filter(function (m) { return m.role !== 'system'; })
                        .map(function (m) { return ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.content }],
                    }); });
                    payload = {
                        system_instruction: {
                            parts: [{ text: SYSTEM_PROMPT }],
                        },
                        contents: contents,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 800,
                            candidateCount: 1,
                        },
                        safetySettings: [
                            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
                        ],
                    };
                    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=".concat(apiKey);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })];
                case 1:
                    res = _e.sent();
                    if (!res.ok) {
                        throw new Error("Gemini API returned status ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_e.sent());
                    candidate = (_a = data.candidates) === null || _a === void 0 ? void 0 : _a[0];
                    text = (_d = (_c = (_b = candidate === null || candidate === void 0 ? void 0 : candidate.content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c.map(function (p) { var _a; return (_a = p.text) !== null && _a !== void 0 ? _a : ''; }).join('')) !== null && _d !== void 0 ? _d : '';
                    if (!text) {
                        throw new Error('Invalid response structure from Gemini API');
                    }
                    leadCaptureRecommended = checkLeadCaptureRecommendation(text, messages);
                    return [2 /*return*/, { message: text, leadCaptureRecommended: leadCaptureRecommended }];
            }
        });
    });
}
function callOpenAIAPI(apiKey, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var openAiMessages, res, data, text, leadCaptureRecommended;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    openAiMessages = __spreadArray([
                        { role: 'system', content: SYSTEM_PROMPT }
                    ], messages.map(function (m) { return ({
                        role: m.role === 'assistant' ? 'assistant' : 'user',
                        content: m.content,
                    }); }), true);
                    return [4 /*yield*/, fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(apiKey),
                            },
                            body: JSON.stringify({
                                model: 'gpt-4o-mini',
                                messages: openAiMessages,
                                temperature: 0.7,
                                max_tokens: 500,
                            }),
                        })];
                case 1:
                    res = _d.sent();
                    if (!res.ok) {
                        throw new Error("OpenAI API returned status ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_d.sent());
                    text = (_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
                    if (!text) {
                        throw new Error('Invalid response structure from OpenAI API');
                    }
                    leadCaptureRecommended = checkLeadCaptureRecommendation(text, messages);
                    return [2 /*return*/, { message: text, leadCaptureRecommended: leadCaptureRecommended }];
            }
        });
    });
}
function checkLeadCaptureRecommendation(aiResponse, messages) {
    var _a;
    var lowerResp = aiResponse.toLowerCase();
    var lastUser = ((_a = __spreadArray([], messages, true).reverse().find(function (m) { return m.role === 'user'; })) === null || _a === void 0 ? void 0 : _a.content.toLowerCase()) || '';
    if (lowerResp.includes('contact form') ||
        lowerResp.includes('buzzlemax team') ||
        lowerResp.includes('collect a few details') ||
        lowerResp.includes('follow up with you') ||
        lastUser.includes('talk to someone') ||
        lastUser.includes('contact') ||
        lastUser.includes('quote')) {
        return true;
    }
    return false;
}
