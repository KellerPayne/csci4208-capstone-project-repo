import {questions} from '../db/questions.js';     // imports questions wrapper to connect quiz logic to questions.json

// creates a namespace of quiz-related functions.
export const quizService = {
    // gets questions by a specific index
    getQuestionByIndex(index) {
        const all = questions.getAll();     // retrieves all questions from DB layer
        return all[index] || null;      // returns the question at the provided index, or null if index is out of range
    },

    // checks the answer of a question
    checkAnswer(questionId, answerIndex) {
        const q = questions.get(questionId);        // gets the question object from questions.json
        return q.correct === answerIndex;       // compares the answer and returns true if correct or false if incorrect
    }
};

