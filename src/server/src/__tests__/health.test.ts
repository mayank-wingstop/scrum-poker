import request from 'supertest';
import WebSocket from 'ws';
import { app, server } from '../index';

const TEST_PORT = 3099;

beforeAll((done) => {
  server.listen(TEST_PORT, done);
});

afterAll((done) => {
  server.close(done);
});

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('WebSocket server', () => {
  it('handles invalid JSON gracefully with ERROR message', (done) => {
    const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);

    ws.on('open', () => {
      ws.send('not-valid-json');
    });

    ws.on('message', (data) => {
      const msg = JSON.parse(data.toString());
      expect(msg.type).toBe('ERROR');
      expect(msg.payload.message).toBe('Invalid message format');
      ws.close();
      done();
    });

    ws.on('error', (err) => done(err));
  });

  it('accepts a connection and handles close event', (done) => {
    const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
    ws.on('open', () => ws.close());
    ws.on('close', () => done());
    ws.on('error', (err) => done(err));
  });
});
