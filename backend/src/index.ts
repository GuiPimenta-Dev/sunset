import express from 'express';
import cors from 'cors';
import { AccessToken } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.LIVEKIT_API_KEY || 'devkey';
const API_SECRET = process.env.LIVEKIT_API_SECRET || 'secret';
const WS_URL = process.env.LIVEKIT_WS_URL || 'ws://localhost:7880';

// Rota para gerar token de acesso
app.post('/token', (req, res) => {
  try {
    const { room, identity } = req.body;
    
    if (!room || !identity) {
      return res.status(400).json({ error: 'Room and identity are required' });
    }

    const at = new AccessToken(API_KEY, API_SECRET, {
      identity,
      ttl: 24 * 60 * 60, // 24 horas
      metadata: JSON.stringify({
        // Add metadata to help with session management
        clientVersion: '1.0.0',
        platform: 'web',
        timestamp: Date.now()
      })
    });

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      // Add room options
      roomCreate: true,
      roomList: true,
      roomRecord: true,
      roomAdmin: true
    });

    const token = at.toJwt();
    res.json({ token });
  } catch (error) {
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