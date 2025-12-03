import {sessions} from '../db/session.js';     // import the data layer wrapper for sessions.json file
import {quizService} from './quizService.js'; // import question-resolution logic from quizService.js

/*
Creates an object that contains all logic related to game sessions, such as:
- adding a player to a session
- retrieving the current session
*/
export const sessionService = {
    // core of multiplayer logic
    createSession(subjectPrefix) {
        return sessions.create({
            subjectPrefix,
            playerIds: [],
            currentQuestionIndex: 0,
            isActive: true,
            createdAt: Date.now()
        });
    },

    joinSession(playerId, subjectPrefix) {
        let session = sessions.getActiveForSubject(subjectPrefix);

        if (!session) {
            session = this.createSession(subjectPrefix);
        }

        if (!session.playerIds.includes(playerId)) {
            session.playerIds.push(playerId);
        }

        sessions.update(session.id, session);
        return session;
    },

    getCurrentQuestion(sessionId) {
        const session = sessions.getId(sessionId);

        if (!session) return null;

        const q = quizService.getQuestionByIndexForSubject(session.subjectPrefix, session.currentQuestionIndex);
        
        if (!q) return null;

        return {
            id: q.id,
            text: q.text,
            choices: q.choices
        };
    },

    advanceToNextQuestion(sessionId) {
        const session = sessions.getId(sessionId);
        session.currentQuestionIndex += 1;
        sessions.update(sessionId, session);
    }
};