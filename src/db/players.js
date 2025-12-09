import { Database } from "./database.js";   // imports Database class found in database.js
import crypto from 'crypto';    // imports Node's cryptography library to generate safe, unique playerId's

const db = new Database('players.json'); // creates a database instance that loads, caches, and saves to players.json file

export const players = {    // players class that services layer will import an use; hence 'export'
    create(name, subjectPrefix) {      // add a new player to the database
        const newPlayer = {
            id: crypto.randomUUID(),        // generates a universally unique ID for playerId
            name,       // saves the name passed into the function as the player's name
            score: 0,       // sets player's points to 0 initially
            subjectPrefix,
            createdAt: Date.now()       // timestamp used for sorting or metadata
        };
        db.cache.push(newPlayer);       // adds the new player into the cached in-memory array
        db.save();      // writes updated cache to players.json using atomic write
        return newPlayer;       // returns the full player object for API routes to send as JSON
    },

    // returns all player records
    getAll() {
        return db.getAll();
    },

    // returns a single player, found using their ID
    get(id) {
        return db.getAll().find(p => p.id === id);
    },

    // updates a player's fields, such as 'score'
    update(id, data) {
        const all = db.getAll(); // gets the entire array of players
        const idx = all.findIndex(p => p.id === id);    // finds the index of the player in that array
        if (idx === -1) return null;        // if the player doesn't exist, returns null
        all[idx] = { ...all[idx], ...data};     // merges the existing player with the new fields
        db.writeAll(all);       // writes the entire updated array back to the JSON file
        return all[idx];        // returns updated player for service/API layer
    },

    // deletes a player from the database
    delete(id) {
        const all = db.getAll().filter(p => p.id !== id); // gets the entire array of players then uses filter to remove the one matching the ID passed
        db.writeAll(all); // save the filtered array back to disk
    }
};