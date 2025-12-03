import express from 'express';      // import express to be able to create a new router
import {quizService} from '../services/quizService.js';     // import quizService for answer checking logic
import {playerService} from '../services/playerService.js';     // import playerService to update player scores and return new score to client

export const quizRouter = express.Router();     // creates the router

// Define the answer endpoint
quizRouter.post('/answer', (req, res) => {
    const {playerId, questionId, answer} = req.body;        // extracts the request body
    const correct = quizService.checkAnswer(questionId, answer);        // checks the answer

    if (correct) {      // if the answer is correct
        const updated = playerService.updateScore(playerId, 5);     // updates score
        return res.json({corretc: true, updatedScore: updated.score});      // returns updated score to client UI
    } else {        // if the answer is incorrect
        return res.json({correct: false});      // nothing happens with player score, client is instructed to display "incorrect"
    }
});