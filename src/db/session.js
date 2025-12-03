import {Database} from './database.js'; // imports Database class from database.js
import crypto from 'crypto';        // used to generate unique sessionIDs

const db = new Database('sessions.json'); // creates a database instance for sessions as sessions.json

export const sessions = {
    // creates a new game session
    create({subjectPrefix, playerIds, currentQuestionIndex, isActive, createdAt}) {
        const newSession = {
            id: crypto.randomUUID(),        // unique session id generated and saved in id field
            subjectPrefix,
            playerIds,
            currentQuestionIndex,        // which question the game is currently on
            isActive,     // true when session is active
            createdAt       // timestamp for debugging/sorting if needed
        };

        db.cache.push(newSession);      // pushes oabject into in-memory cache
        db.save();      // saves it to sessions.json via atomic write
        return newSession;      // returns the session to the service layer
    },

    // returns all sessions from the in-memory cache
    getAll() {
        return db.getAll();
    },

    // retrieves a session by ID
    getId(id) {
        return db.getAll().find(s => s.id === id);
    }, 

    //  updates a session by ID
    update(id, data) {
        const all = db.getAll();        // gets an array of all session data
        const index = all.findIndex(s => s.id === id);      // finds the specific index of data to be updated
        if (index === -1) return null;      // if it doesn't exist, returns null

        all[index] = {...all[index], ...data};      // merges in new data to that session
        db.writeAll(all);       // writes it to disk
        return all[index];      // return
    },

    // returns the current active game session
    getActiveForSubject(subjectPrefix) {
        return db.getAll().find(s => s.isActive && s.subjectPrefix === subjectPrefix);
    }
};