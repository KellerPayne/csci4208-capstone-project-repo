import { players } from "../src/db/players.js";
import { playerService } from "../src/services/playerService.js";
import { runTest, assert } from "./testUtils.js";

console.log("=== Player / playerService tests ===");

runTest("players wrapper create/get/update/delete", () => {
  const name = `DB-TestPlayer-${Date.now()}`;

  const created = players.create(name);
  assert.ok(created.id);
  assert.strictEqual(created.name, name);
  assert.strictEqual(created.score, 0);

  const fetched = players.get(created.id);
  assert.ok(fetched);

  const updated = players.update(created.id, { score: 10 });
  assert.strictEqual(updated.score, 10);

  players.delete(created.id);
  const afterDelete = players.get(created.id);
  assert.strictEqual(afterDelete, undefined);
});

runTest("playerService rejects invalid names", () => {
  assert.throws(() => playerService.createPlayer(""), /Name is required/);
});

runTest("playerService create/fetch/update/delete flow", () => {
  const name = `Service-TestPlayer-${Date.now()}`;

  const created = playerService.createPlayer(name);
  assert.ok(created.id);
  assert.strictEqual(created.score, 0);

  const fetched = playerService.getPlayer(created.id);
  assert.strictEqual(fetched.id, created.id);

  const updated = playerService.updateScore(created.id, 5);
  assert.strictEqual(updated.score, 5);

  playerService.deletePlayer(created.id);
  assert.throws(() => playerService.getPlayer(created.id));
});
