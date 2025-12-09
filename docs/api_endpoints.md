# API Endpoint Reference

---

## Players (CRUD Resource)

### `GET /api/players`
Retrieve all players.
**Body:**
```json
[
  {
    "id": "uuid",
    "name": "Alice",
    "subjectPrefix": "q",
    "score": 12,
    "createdAt": 1765250751256
  }
]
```
### `POST /api/players`
Create a new player.

**Body:**
```json
{
  "id": "uuid",
  "name": "Alice",
  "subjectPrefix": "q",
  "score": 0
}
```

### `GET /api/players/:id`
Retrieve a specific player.

### `PATCH /api/players/:id`
Update player fields (like score).

**Body:**
```json
{
  "score": 18
}
```

### `DELETE /api/players/:id`
Remove a player.

---

## Game Sessions

### `POST /api/session/join`
Adds a player to the active session.

**Body:**
```json
{
  "playerId": "123",
  "subjectPrefix": "q"
}
```

**Response:**
```json
{
  "id": "sessionUUID",
  "subjectPrefix": "q",
  "playerIds": ["123"],
  "currentQuestionIndex": 0,
  "isActive": true
}
```

### `GET /api/session/current-question/:sessionId`
Returns the next question for the requesting player.

**Response:**
```json
{
  "id": "q1",
  "text": "What does JVM stand for?",
  "choices": ["A", "B", "C", "D"],
  "correctIndex": 1
}
```

### `POST /api/quiz/answer`
Submit an answer.

**Body:**
```json
{
  "playerId": "123",
  "sessionId": "abc-session",
  "questionId": "q1",
  "answerIndex": 2
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