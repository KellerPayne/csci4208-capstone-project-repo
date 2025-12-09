import { Database } from "../src/db/database.js";
import { runTest, assert } from "./testUtils.js";

console.log("=== Database tests ===");

runTest("Database loads players.json", () => {
  const db = new Database("players.json");
  const all = db.getAll();
  assert.ok(Array.isArray(all), "players.json should parse to an array");
});

runTest("Database loads questions.json", () => {
  const db = new Database("questions.json");
  const all = db.getAll();
  assert.ok(Array.isArray(all), "questions.json should parse to an array");
});

runTest("Database loads sessions.json", () => {
  const db = new Database("sessions.json");
  const all = db.getAll();
  assert.ok(Array.isArray(all), "sessions.json should parse to an array");
});
