import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createSession } from '../store/sessionStore';

const sessionsRouter = Router();

sessionsRouter.post('/', (req: Request, res: Response) => {
  const { facilitatorName, story = '' } = req.body as {
    facilitatorName?: unknown;
    story?: unknown;
  };

  // Validation
  if (typeof facilitatorName !== 'string' || facilitatorName.trim().length === 0) {
    res.status(400).json({ error: 'facilitatorName is required' });
    return;
  }

  const trimmedName = facilitatorName.trim();

  if (trimmedName.length > 30) {
    res.status(400).json({ error: 'facilitatorName must be 30 characters or fewer' });
    return;
  }

  const trimmedStory = typeof story === 'string' ? story.trim() : '';

  if (trimmedStory.length > 200) {
    res.status(400).json({ error: 'story must be 200 characters or fewer' });
    return;
  }

  try {
    const sessionId = uuidv4();
    const participantId = uuidv4();

    createSession({
      sessionId,
      facilitatorId: participantId,
      facilitatorName: trimmedName,
      story: trimmedStory,
    });

    console.info(`[sessions] created sessionId=${sessionId}`);

    res.status(201).json({
      sessionId,
      participantId,
      sessionUrl: `/session/${sessionId}`,
    });
  } catch (err) {
    console.error('[sessions] unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default sessionsRouter;
