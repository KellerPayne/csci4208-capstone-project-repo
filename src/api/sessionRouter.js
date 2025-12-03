import express from 'express';      // import express to be able to create routers
import {sessionService} from '../services/sessionService.js';       // import game logic for joining sessions, fetching current questions, and tracking question progression

export const sessionRouter = express.Router();  // create new router object
// allows player to join the game session
sessionRouter.post('/join', (req, res) => {
    const session = sessionService.joinSession(req.body.playerId);      // gets playerId from request body before calling sessionService.joinSession()
    res.json(session);  // responds with the session object
});
// get question for the current session
sessionRouter.get('/current-question', (req, res) => {
    const q = sessionService.getCurrentQuestion(req.session.sessionId);     // middleware sets req.session.sessionId and assigns a session ID cookie, calls service layer
    res.json(q);        // sends question object as JSON
});