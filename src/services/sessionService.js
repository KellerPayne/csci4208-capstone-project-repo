import {sessions} from '../db/session.js';     // import the data layer wrapper for sessions.json file
import {quizService} from './quizService.js'; // import question-resolution logic from quizService.js

/*
Creates an object that contains all logic related to game sessions, such as:
- adding a player to a session
- retrieving the current session
*/
export const sessionService = {
    // core of multiplayer logic
    createSession(subjectPrefix) {      // creates a new session for a specific subject
        return sessions.create({
            subjectPrefix,          // stores subject prefix of question type selected
            playerIds: [],      // stores the playerIds in that session
            currentQuestionIndex: 0,        // sets current question index to 0
            isActive: true,         // sets session isActive to true
            createdAt: Date.now()       // sets the date at which it was created
        });
    },

    joinSession(playerId, subjectPrefix) {
        let session = sessions.getActiveForSubject(subjectPrefix);      // checks for an existing active session for that subject prefix

        if (!session) {     // if no session exists
            session = this.createSession(subjectPrefix);        // creates a session for that subject prefix
        }

        if (!session.playerIds.includes(playerId)) {        // checks if current session's playerId's contains the current player's playerId
            session.playerIds.push(playerId);       // if not, pushes it into the list
        }

        sessions.update(session.id, session);       // updates the session 
        return session;         // returns the session
    },

    getCurrentQuestion(sessionId) {
        const session = sessions.getId(sessionId);      // fetches session from sessions.json with given id

        if (!session) return null;      // if no session with that id, return null

        // retrieves the current question based on subjectPrefix, and current question index
        const q = quizService.getQuestionByIndexForSubject(session.subjectPrefix, session.currentQuestionIndex);
        
        if (!q) return null;        // if there's no question stored in q, returns null

        return {
            id: q.id,       // returns the id needed for answer submission
            text: q.text,       // returns the quetion itself
            choices: q.choices      // returns the choices
        };
    },

    advanceToNextQuestion(sessionId) {  
        const session = sessions.getId(sessionId);      // gets current question
        session.currentQuestionIndex += 1;      // moves session forward to the next question
        sessions.update(sessionId, session);        // saves updated session back into sessions.json
    }
};