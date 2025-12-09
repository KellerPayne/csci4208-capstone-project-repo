# UNO Study Arena

A fast, browser-based multiplayer quiz game built for students in Computer Science at UNO to compete in a Kahoot-style format. 

## Screenshots / Demo

## How to Run the Project
### Requirements
- node.js v18+
- npm (Node Package Manager)
### Steps
1. Install Dependencies
```bash
npm install
```
2. Navigate to folder containing index.html in your system.
3. Start the server
```bash
npm start
```
4. Open your browser and go to http://localhost:3000

## How It Works (High-Level)
### Architecture in Brief
A thin client (HTML + vanilla JS) communicates with a thick Node.js server that handles:
- player creation
- session creation
- question selection by subject
- scoring and progression logic

### Technology Stack
The browswer only renders UI and communicates via simple fetch requests.
- Node.js ─ application runtime
- Express.js ─ API routing
- Vanilla JS ─ front-end logic
- JSON File Storage ─ persistent local data
- Crypto API ─ unique ID generation
- Custom Middleware ─ session tracking and error handling

## API Examples (High-Level)
### Create A Player
```bash
curl -X POST http://localhost:3000/api/players \
-H "Content-Type: application/json" \
-d '{"name": "Alex"}'
```

### Join a Session
```bash
curl -X POST http://localhost:3000/api/session/join \
-H "Content-Type: application/json" \
-d '{"playerId": "123", "subjectPrefix": "ds"}'
```

### Submit an Answer
```bash
curl -X POST http://localhost:3000/api/quiz/answer \
-H "Content-Type: application/json" \
-d '{"playerId": "123", "questionId": "ds17", "answerIndex": 2}'
```

Full API Documentation can be found in the Developer Docs section

## Developer Docs
These documents are inside of the /docs/ directory:
- Architecture Sketch: `docs/architecture_sketch.md`
- Sprint Planning Docs
    - `docs/dod-sprint1.md`
    - `docs/dod-sprint2.md`
    - `docs/dod-sprint3.md`
    - `docs/dod-sprint4.md`
- Design
    - `docs/api_endpoints.md`
    - `docs/roadmap.md`
