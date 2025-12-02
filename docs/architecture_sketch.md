# Architecture Sketch

```
[Client (Thin UI)]
    HTML/CSS/JS
    │
    v fetch('/api/...')

[API Layer - Express Routers]
    playersRouter.js
    sessionsRouter.js
    quizRouter.js
    │
    v

[Service Layer - Domain Logic]
    playerService.js
    sessionService.js
    quizService.js
    │
    v

[DB Layer - JSON File Store]
    players.json
    sessions.json
    questions.json
```

## Module Map
### src/db/
- `database.js` - handles file I/O, caching, and atomic writes
- `player.js` - data access helpers
- `sessions.js`
- `question.js`

### src/services/
- `playerService.js` - create, update, score, validate
- `quizService.js` - question flow, answer checking
- `sessionService.js` - join game, manage players in session

### src/api/
- `playersRouter.js`
- `quizRouter.js`
- `sessionRouter.js`

### src/middleware/
- `sessionMiddleware.js` - creates/validates session cookies
- `errorHandler.js` - centralized JSON error envelope