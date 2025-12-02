# Pitch

**Track:** Thin UI (Private API)

**Product:** UNO Study Arena -- A multiplayer quiz battle where students compete by answering program-related study questions.

**Problem & User:** Students need an engaging, low-friction way to prepare for exams. This app helps students review key concepts for individual classes through competitive, real-time quiz gameplay.

**Core Data Entities:**
The server manages three related collections: **Players**, **Questions**, and **Game Sessions**. Players join a session, the server assigns questions, validates answers, updates scores, and controls game flow. All logic is centralized on the Node/Express server following a thick-server, thin-client model.