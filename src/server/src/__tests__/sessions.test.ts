import request from 'supertest';
import { app } from '../index';
import sessionStore from '../store/sessionStore';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('POST /sessions', () => {
  beforeEach(() => {
    // Clear store between tests to avoid state leakage
    sessionStore.clear();
  });

  it('creates a session and returns 201 with sessionId, participantId, sessionUrl', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'Alice' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.sessionId).toMatch(UUID_V4_REGEX);
    expect(res.body.participantId).toMatch(UUID_V4_REGEX);
    expect(res.body.sessionUrl).toBe(`/session/${res.body.sessionId}`);
  });

  it('stores the session in sessionStore with facilitator as first participant', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'Bob' })
      .set('Content-Type', 'application/json');

    const session = sessionStore.get(res.body.sessionId);
    expect(session).toBeDefined();
    expect(session!.facilitatorId).toBe(res.body.participantId);
    expect(session!.participants.get(res.body.participantId)?.name).toBe('Bob');
    expect(session!.participants.get(res.body.participantId)?.vote).toBeNull();
  });

  it('includes a first story when provided', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'Carol', story: 'US-101 Login page' })
      .set('Content-Type', 'application/json');

    const session = sessionStore.get(res.body.sessionId);
    expect(session!.currentStory).toBe('US-101 Login page');
  });

  it('trims whitespace from facilitatorName before storing', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: '  Alice  ' })
      .set('Content-Type', 'application/json');

    const session = sessionStore.get(res.body.sessionId);
    expect(session!.participants.get(res.body.participantId)?.name).toBe('Alice');
  });

  it('returns 400 when facilitatorName is missing', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({})
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/facilitatorName is required/i);
  });

  it('returns 400 when facilitatorName is empty string', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: '' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
  });

  it('returns 400 when facilitatorName is whitespace only', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: '   ' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
  });

  it('returns 400 when facilitatorName exceeds 30 characters', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'A'.repeat(31) })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/30 characters/i);
  });

  it('accepts facilitatorName of exactly 30 characters', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'A'.repeat(30) })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
  });

  it('returns 400 when story exceeds 200 characters', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'Alice', story: 'S'.repeat(201) })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/200 characters/i);
  });

  it('accepts story of exactly 200 characters', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'Alice', story: 'S'.repeat(200) })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
  });

  it('works when story is omitted', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ facilitatorName: 'Alice' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    const session = sessionStore.get(res.body.sessionId);
    expect(session!.currentStory).toBe('');
  });
});
