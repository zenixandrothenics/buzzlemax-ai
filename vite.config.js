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
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { processChatRequest } from './src/server/sales-engine';
function buzzlemaxChatApiPlugin() {
    var _this = this;
    var handler = function (req, res, next) {
        if (req.url === '/api/chat' && req.method === 'POST') {
            var body_1 = '';
            req.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            req.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                var parsed, clientIp, result, err_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            parsed = JSON.parse(body_1 || '{}');
                            clientIp = req.headers['x-forwarded-for'] ||
                                ((_a = req.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress) ||
                                '127.0.0.1';
                            return [4 /*yield*/, processChatRequest(parsed.messages || [], clientIp)];
                        case 1:
                            result = _b.sent();
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(result));
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _b.sent();
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({
                                message: 'Something went wrong on my side. You can still reach the BuzzleMax team through the contact form.',
                                leadCaptureRecommended: true,
                            }));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return;
        }
        next();
    };
    return {
        name: 'buzzlemax-chat-api',
        configureServer: function (server) {
            server.middlewares.use(handler);
        },
        configurePreviewServer: function (server) {
            server.middlewares.use(handler);
        },
    };
}
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    // Securely propagate keys to process.env during local dev server execution
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    process.env.OPENAI_API_KEY = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    return {
        base: '/',
        plugins: [react(), buzzlemaxChatApiPlugin()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@/components': path.resolve(__dirname, './src/components'),
                '@/features': path.resolve(__dirname, './src/features'),
                '@/hooks': path.resolve(__dirname, './src/hooks'),
                '@/pages': path.resolve(__dirname, './src/pages'),
                '@/services': path.resolve(__dirname, './src/services'),
                '@/types': path.resolve(__dirname, './src/types'),
                '@/lib': path.resolve(__dirname, './src/lib'),
                '@/utils': path.resolve(__dirname, './src/utils'),
            },
        },
        server: {
            port: 3000,
            open: true,
        },
        build: {
            target: 'es2020',
            cssCodeSplit: true,
            sourcemap: false,
            chunkSizeWarningLimit: 600,
            rollupOptions: {
                output: {
                    manualChunks: function (id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('framer-motion')) {
                                return 'vendor-motion';
                            }
                            if (id.includes('@radix-ui')) {
                                return 'vendor-radix';
                            }
                            if (id.includes('lucide-react')) {
                                return 'vendor-icons';
                            }
                            if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('/react/')) {
                                return 'vendor-react';
                            }
                        }
                    },
                },
            },
        },
    };
});
