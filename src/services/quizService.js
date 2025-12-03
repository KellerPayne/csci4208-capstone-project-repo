import {questions} from '../db/questions.js';     // imports questions wrapper to connect quiz logic to questions.json
import {playerService} from './playerService.js';
import {sessions} from '../db/session.js';
import {sessionService} from './sessionService.js';

// creates a namespace of quiz-related functions.
export const quizService = {
    // gets questions by subject prefix
    getQuestionsBySubject(subjectPrefix) {
        const all = questions.getAll();
        console.log("ALL QUESTIONS:", all);
        const filtered = all.filter(q => q.id.startsWith(subjectPrefix));
        console.log("FILTERED:", filtered);
        return filtered;
    },

    // gets questions by a specific index
    getQuestionByIndexForSubject(subjectPrefix, index) {
        const subjectQuestions = this.getQuestionsBySubject(subjectPrefix);
        return subjectQuestions[index] || null;
    },

    // checks the answer of a question
    checkAnswer(id, answerIndex) {
        const q = questions.get(id);        // gets the question object from questions.json
        if (!q) return false;
        return q.correct === answerIndex;       // compares the answer and returns true if correct or false if incorrect
    },

    submitAnswer(playerId, sessionId, id, answerIndex) {
        const correct = this.checkAnswer(id, answerIndex);
        if (correct) {
            playerService.updateScore(playerId, 1);
        }

        const session = sessions.getId(sessionId);

        if (session) {
            sessionService.advanceToNextQuestion(session.id);
        }
        
        return {correct};
    }
};

