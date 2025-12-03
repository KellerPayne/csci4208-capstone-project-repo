# Sprint 1 - Definition of Done (Database)

- [ ] The Node.js database module is fully refactored from the browser-based DB:
    - Uses the Node `fs` module for all file reads and writes
    - Maintains an in-memory cache for fast access
    - Implements atomic writes using the `.tmp → rename` strategy
- [ ] The database supports at least three collections stored as JSON files:
    - `players.json`
    - `sessions.json`
    - `questions.json` (preloaded or seeded)
- [ ] All provided test scripts (e.g., `tests/db-tests.js`) execute successfully:
    - Creates data, reloads DB, and persists across restarts
    - Validates correct read/write behavior
    - Provides atomic write logic is functioning
- [ ] `docs/` directory has been created at the project root
