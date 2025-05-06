# Sunset - Screen Share

A high-quality screen sharing and video conferencing tool using LiveKit.

> **Note**  
> This application is designed for high-quality screen sharing with up to 4K resolution and 60 FPS support.

## Requirements

- Node.js 18+
- Modern browser with WebRTC support
- Good internet connection (10+ Mbps recommended for 4K)

## Features

- 📺 High-quality screen sharing (up to 4K @ 60 FPS)
- 🎥 Call recording with automatic reminders
- 👥 Participant counter
- ⏱️ Call timer with play/pause
- 🔊 High-quality audio support
- 🔄 Automatic recording reminders
- 🎯 Optimized video encoding for best quality

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the LiveKit server:
   ```bash
   livekit-server --config config.yaml --dev
   ```
4. Start the backend:
   ```bash
   cd backend
   npm start
   ```
5. Open `index.html` in your browser

## Usage

1. Enter a room name and click "Entrar na Sala"
2. Use the control buttons to:
   - Toggle microphone
   - Share screen
   - Start/stop recording
   - Leave room
3. The timer can be paused/resumed using the play/pause button
4. Recording reminders will appear after 5 minutes if not recording

## Configuration

The application is configured for maximum quality:

- 4K resolution (3840x2160)
- 60 FPS
- 8 Mbps bitrate for 4K
- VP9/H.264 codec support
- Hardware acceleration enabled

## Recursos

- Compartilhamento de tela em alta qualidade (até 4K)
- Gravação de chamadas
- Contador de participantes
- Timer de chamada
- Lembrete de gravação automático
