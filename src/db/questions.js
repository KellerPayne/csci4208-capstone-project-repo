import {Database} from './database.js';     // imports Database class from database.js

const db = new Database('questions.json');      // creates a database instance tied to questions.json

export const questions = {      // cerates and exports the questions wrapper
    
    // returns entire list of questions from in-memory cache
    getAll() {
        return db.getAll();
    },

    // retrieves a specific question based on it's ID
    get(id) {
        return db.getAll().find(q => q.id === id);
    }
};