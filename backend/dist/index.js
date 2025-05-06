"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const livekit_server_sdk_1 = require("livekit-server-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
const API_KEY = 'devkey';
const API_SECRET = 'secret';
const WS_URL = 'ws://localhost:7880';
// Rota para gerar token de acesso
app.post('/token', (req, res) => {
    try {
        const { room, identity } = req.body;
        if (!room || !identity) {
            return res.status(400).json({ error: 'Room and identity are required' });
        }
        const at = new livekit_server_sdk_1.AccessToken(API_KEY, API_SECRET, {
            identity,
            ttl: 24 * 60 * 60, // 24 horas
        });
        at.addGrant({
            room,
            roomJoin: true,
            canPublish: true,
            canSubscribe: true,
            canPublishData: true,
        });
        const token = at.toJwt();
        res.json({ token });
    }
    catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Failed to generate token' });
    }
});
// Rota de healthcheck
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('LiveKit WebSocket URL:', WS_URL);
});
