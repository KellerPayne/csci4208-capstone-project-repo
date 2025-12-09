import { sessions } from "../src/db/sessions.js";
import { sessionService } from "../src/services/sessionService.js";
import { playerService } from "../src/services/playerService.js";
import { questions } from "../src/db/questions.js";
import { runTest, assert } from "./testUtils.js";

console.log("=== Sessions / sessionService tests ===");

runTest("sessions wrapper create/get/update works", () => {
  const newSession = sessions.create({
    subjectPrefix: "TST",
    playerIds: [],
    currentQuestionIndex: 0,
    isActive: true,
    createdAt: Date.now(),
  });

  assert.ok(newSession.id);

  const fetched = sessions.getId(newSession.id);
  assert.ok(fetched);

  const updated = sessions.update(newSession.id, { isActive: false });
  assert.strictEqual(updated.isActive, false);
});

runTest("sessionService join + current-question + next-question", () => {
  const allQuestions = questions.getAll();
  const prefix =
    allQuestions.length > 0 ? String(allQuestions[0].id).slice(0, 3) : "TST";

  const tempPlayer = playerService.createPlayer(
    `Session-TestPlayer-${Date.now()}`
  );

  const session = sessionService.joinSession(tempPlayer.id, prefix);
  assert.ok(session.id);
  assert.ok(session.playerIds.includes(tempPlayer.id));

  if (allQuestions.length > 0) {
    const q = sessionService.getCurrentQuestion(session.id);
    assert.ok(q);

    const before = session.currentQuestionIndex;
    sessionService.advanceToNextQuestion(session.id);

    const updated = sessions.getId(session.id);
    assert.strictEqual(updated.currentQuestionIndex, before + 1);
  } else {
    console.log(" No questions in DB, skipping question index check");
  }

  playerService.deletePlayer(tempPlayer.id);
});
