import { players } from '../db/players.js';       // imports  players operations from players class

// creates a plain object containing all player related functions
export const playerService = {
    createPlayer(name) {        // validates and creates a new player
        if (!name || name.length < 2) {      // checks that the name exists and is at least 2 characters long
            throw new Error('Name is required.');       // if not, throws a new error
        }
        return players.create(name); // else it calls the DB layer to actually create the player
    },

    // returns a list of all players
    listPlayers() {
        return players.getAll();
    },

    // rerieve and validate a player's existance
    getPlayer(id) {
        const p = players.get(id);
        if (!p) throw new Error('Player not found');
        return p;
    },

    // core scoring method
    // confirms player's existence, reads their current score, calculates the new score, and updates with new score
    updateScore(id, delta) {
        const player = this.getPlayer(id);
        return players.update(id, {score: player.score + delta});
    },

    // removes a player
    deletePlayer(id) {
        players.delete(id);
    }
};