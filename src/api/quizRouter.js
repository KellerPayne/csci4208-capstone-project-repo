import express from 'express';
import { quizService } from '../services/quizService.js';

export const quizRouter = express.Router();

// Submit an answer to the current question
quizRouter.post('/answer', (req, res, next) => {
  try {
    const { playerId, sessionId, questionId, answerIndex } = req.body;



    const result = quizService.submitAnswer(playerId, sessionId, questionId, answerIndex);
    res.json(result);
  } catch (err) {
    next(err); // send to errorHandler middleware
  }
});
