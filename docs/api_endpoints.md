# API Endpoint Reference

---

## Players (CRUD Resource)

### `GET /api/players`
Retrieve all players.

### `POST /api/players`
Create a new player.

**Body:**
```json
{"name": "Alice"}
```

### `GET /api/players/:id`
Retrieve a specific player.

### `PATCH /api/players/:id`
Update player fields (like score).

### `DELETE /api/players/:id`
Remove a player.

---

## Game Sessions

### `POST /api/session/join`
Adds a player to the active session.

**Body:**
```json
{"playerID": "123"}
```

### `GET /api/session/current-question`
Returns the next question for the requesting player.

### `POST /api/session/answer`
Submit an answer.

**Body:**
```json
{
    "playerID": "123",
    "questionID": "q10",
    "answer": "B"
}
```

**Response:**
```json
{
    "correct": true,
    "updatedScore": 15
}
```

---

# Health Check (Session Tracking)

### `GET /health`
Returns session ID to verify session middleware works.

**Response:**
```json
{"ok": true, "sessionID": "..."}
```