// tests/run-all-tests.js

import './test-database.js';
import './test-players.js';
import './test-questions-quiz.js';
import './test-sessions.js';

import { printFinalResults } from './testUtils.js';

// At the end of all tests:
printFinalResults();
