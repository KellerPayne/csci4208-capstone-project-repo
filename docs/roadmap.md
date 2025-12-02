# Roadmap

## MVP (Sprint 3)
* Full CRUD for Players (create, list, get, update score, delete)
* Session join flow for a single player
* Server selects and returns questions in order
* Answer validation logic (server-side)
* Thin client that performs a full CRUD flow on Players and allows answering one question end-to-end
* Display loading, success, and error feedback UI

## Full Features (Sprint 4)
* Second resource: Game sessions (managing multple players per session)
* Relational endpoints (e.g., GET /api/sessions/:id/players, GET /api/players/:id/answers)
* Full quiz progression - server controls next question
* Scoreboard with live updates
* Optional real-time integration choice: Server-Sent Events (SSE) to broadcast new questions and score updates
* Polished thin client with final leaderboard
* Demo GIF and professional README