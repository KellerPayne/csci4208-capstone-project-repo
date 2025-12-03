import express from 'express';
import { quizService } from '../services/quizService.js';

export const quizRouter = express.Router();

// Submit an answer to the current question
quizRouter.post('/answer', (req, res, next) => {
  try {
    const { playerId, questionId, answerIndex } = req.body;

    if (!playerId || !questionId || answerIndex === undefined) {
      throw new Error('Missing required fields: playerId, questionId, answerIndex');
    }

    const result = quizService.submitAnswer(playerId, questionId, answerIndex);
    res.json(result);
  } catch (err) {
    next(err); // send to errorHandler middleware
  }
});
