// tests/testUtils.js
import assert from "node:assert";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let failedList = [];

export function runTest(name, fn) {
  totalTests++;

  try {
    fn();
    passedTests++;
    console.log(` PASS: ${name}`);
  } catch (err) {
    failedTests++;
    failedList.push({ name, error: err });
    console.error(` FAIL: ${name}`);
    console.error(err.message);
  }
}

export function printFinalResults() {
  console.log("\n==============================");
  console.log("       TEST SUMMARY");
  console.log("==============================");

  console.log(`Total tests:   ${totalTests}`);
  console.log(`Passed tests:  ${passedTests}`);
  console.log(`Failed tests:  ${failedTests}`);

  if (failedTests === 0) {
    console.log(" ALL TESTS PASSED! GREAT JOB!");
  } else {
    console.log(" SOME TESTS FAILED:");
    failedList.forEach((f) => {
      console.log(` - ${f.name}`);
    });
  }

  console.log("==============================\n");
}

export { assert };
