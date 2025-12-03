import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { playersRouter } from './src/api/playersRouter.js';
import { sessionRouter } from './src/api/sessionRouter.js';
import { quizRouter } from './src/api/quizRouter.js';
import { sessionMiddleware } from './src/middleware/sessionMiddleware.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());          // Parse JSON bodies
app.use(sessionMiddleware);       // Attach session cookie, etc.

// Routers
app.use('/api/players', playersRouter);
app.use('/api/session', sessionRouter);
app.use('/api/quiz', quizRouter);

// Serve client files
app.use(express.static(__dirname));

// Error handler (must come LAST)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
