import express from 'express';      // imports express to be able to create a router
import {playerService} from '../services/playerService.js';     // imports service layer for players

export const playersRouter = express.Router();      // creates a sub-router mounted inside server.js

/*
    Route 1 -- GET (get all players)

    Here's what happens here:
    - Client will call GET /api/players
    - Router will call playerService.listPlayers()
    - Service returns an array of players
    - Express sends the array as JSON
*/

playersRouter.get('/', (req, res) => {
    res.json(playerService.listPlayers());
});

/*
    Route 2 -- POST (create a new player)

    Here's what happens here:
    - Client sends { "name": "Sam"}
    - Router extracts req.body.name and calls playerService.createPlayer(name)
    - Service validates the name, generates an ID, sets the score to 0, and saves the player in DB
    - Router returns the new player with status 201 Created, as is standard for when a new resource was created
*/

playersRouter.post('/', (req, res) => {
    const player = playerService.createPlayer(req.body.name);
    res.status(201).json(player);
});

/*
    Route 3 -- GET (get one player by ID)

    Here's what happens here:
    - Client calls GET/api/players/abc123
    - req.params.id = "abc123"
    - Service fetches that player from DB
    - Returns the player object
*/

playersRouter.get('/:id', (req, res) => {
    res.json(playerService.getPlayer(req.params.id));
});

/*
    Route 4 -- PATCH (update score)

    The endpoint modifies score part of player object
*/

playersRouter.patch('/:id', (req, res) => {
    const updated = playerService.updateScore(req.params.id, req.body.delta || 0);
    res.json(updated);
});

/*
    Route 5 -- DELETE (remove a player)

    Here's what happens here:
    - Client calls DELETE /api/players/abc123
    - Service removes the player from DB
    - Router responds with 204 No Content, since the resource is gone and nothing more is left to send
*/

playersRouter.delete('/:id', (req, res) => {
    playerService.deletePlayer(req.params.id);
    res.status(204).end();
});