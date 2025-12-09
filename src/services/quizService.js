import {questions} from '../db/questions.js';     // imports questions wrapper to connect quiz logic to questions.json
import {playerService} from './playerService.js';   // imports playerService
import {sessions} from '../db/session.js';      // imports sessions
import {sessionService} from './sessionService.js';     // imports sessionService

// creates a namespace of quiz-related functions.
export const quizService = {
    // gets questions by subject prefix
    getQuestionsBySubject(subjectPrefix) {
        const all = questions.getAll();     // gets all questions in questions.json
        const filtered = all.filter(q => q.id.startsWith(subjectPrefix));       // filters out of all questions only questions that have passed prefix
        return filtered;        // returns only filtered questions
    },

    // gets questions by a specific index
    getQuestionByIndexForSubject(subjectPrefix, index) {
        const subjectQuestions = this.getQuestionsBySubject(subjectPrefix);     // gets all questions in a specific subject based on subject prefix
        return subjectQuestions[index] || null;     // returns the specific question based on index being passed out of list of all questions for that specific subject
    },

    // checks the answer of a question
    checkAnswer(id, answerIndex) {
        const q = questions.get(id);        // gets the question object from questions.json
        if (!q) return false;       // if question with that id doesn't exist, returns false
        return q.correct === answerIndex;       // compares the answer and returns true if correct or false if incorrect
    },

    submitAnswer(playerId, sessionId, id, answerIndex) {
        const correct = this.checkAnswer(id, answerIndex);      // checks players answer
        if (correct) {
            playerService.updateScore(playerId, 1);     // if it is correct, updates their score
        }

        const session = sessions.getId(sessionId);      // retrieves the session object from the sessions.json

        if (session) {
            sessionService.advanceToNextQuestion(session.id);       // if the session exists, advances to next question
        }
        
        return {correct};       // returns an object so that the frontend knows whether or not the answer was right
    }
};

