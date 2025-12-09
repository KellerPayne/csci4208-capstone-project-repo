import { questions } from "../src/db/questions.js";
import { quizService } from "../src/services/quizService.js";
import { runTest, assert } from "./testUtils.js";

console.log("=== Questions / quizService tests ===");

runTest("questions.getAll() returns an array", () => {
  const all = questions.getAll();
  assert.ok(Array.isArray(all));
});

runTest("quizService.getQuestionsBySubject returns correct prefix questions", () => {
  const all = questions.getAll();

  if (all.length === 0) {
    console.log("⚠️ No questions available, skipping prefix test");
    return;
  }

  const first = all[0];
  const prefix = String(first.id).slice(0, 3);

  const subset = quizService.getQuestionsBySubject(prefix);
  assert.ok(subset.length > 0);

  subset.forEach((q) => {
    assert.ok(String(q.id).startsWith(prefix));
  });
});
