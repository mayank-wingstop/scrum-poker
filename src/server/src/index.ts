import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import rateLimit from 'express-rate-limit';
import healthRouter from './routes/health';
import sessionsRouter from './routes/sessions';

const app = express();

// Middleware
app.use(express.json());

// Rate limiter — scoped to POST /sessions only
// Skipped in test environment to avoid interference with the test suite
const sessionCreateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
  skip: () => process.env.NODE_ENV === 'test',
});

// Routes
app.use('/', healthRouter);
app.use('/sessions', sessionCreateLimiter, sessionsRouter);

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
