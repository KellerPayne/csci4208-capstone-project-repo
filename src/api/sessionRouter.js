import express from 'express';      // import express to be able to create routers
import {sessionService} from '../services/sessionService.js';       // import game logic for joining sessions, fetching current questions, and tracking question progression

export const sessionRouter = express.Router();  // create new router object
// allows player to join the game session
sessionRouter.post('/join', (req, res, next) => {
    try {
        const {playerId, subjectPrefix} = req.body;     // extracts playerId and subjectPrefix from JSON body sent by client

        if (!playerId || !subjectPrefix) {      // if either of those fields are empty, throws an error
            throw new Error("Missing required fields: playerId, subjectPrefix");
        }

        const session = sessionService.joinSession(playerId, subjectPrefix);      // gets playerId from request body before calling sessionService.joinSession()
        res.json(session);  // responds with the session object
    } catch (err){
        next(err);
    }
});

// get question for the current session
sessionRouter.get('/current-question/:sessionId', (req, res, next) => {
    try {
        const {sessionId} = req.params;     // extracts sessionId from the request URL

        const q = sessionService.getCurrentQuestion(sessionId);     // middleware sets req.session.sessionId and assigns a session ID cookie, calls service layer
        res.json(q);        // sends question object as JSON
    } catch (err) {
        next(err);
    }
});