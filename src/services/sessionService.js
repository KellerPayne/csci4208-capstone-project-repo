
import {sessions} from '../db/sessions.js';     // import the data layer wrapper for sessions.json file
import {quizService} from './quizService.js'; // import question-resolution logic from quizService.js

/*
Creates an object that contains all logic related to game sessions, such as:
- adding a player to a session
- retrieving the current session
*/
export const sessionService = {
    // core of multiplayer logic
    joinSession(playerId) {
        let session = sessions.getActive();     // look for an active session
        if (!session) {     // if one doesn't exist
            session = sessions.create();        // create one
        }
        session.playerIds.push(playerId);       // adds player to the session
        sessions.update(session.id, session);       // updates the session inside sessions.json using atomic write
        return session;     // returns the updated session
    },

    // tells the thin client exactly what question to display
    getCurrentQuestion(sessionId) {
        const session = sessions.get(sessionId);    // get the session from sessions.json by the ID
        return quizService.getQuestionByIndex(session.currentQuestionIndex);        // return current question based on index
    }
};