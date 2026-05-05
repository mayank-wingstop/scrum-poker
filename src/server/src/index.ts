import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import healthRouter from './routes/health';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', healthRouter);

// HTTP server
const server = http.createServer(app);

// WebSocket server — attached to the same HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    try {
      JSON.parse(data.toString()); // parsed but routing deferred to feature stages
      // Message routing handled per-feature (see messageHandler.ts)
    } catch {
      ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Invalid message format' } }));
    }
  });

  ws.on('close', () => {
    // Participant disconnect handling — implemented per-feature
  });
});

export { app, server };
