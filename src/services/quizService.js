import {questions} from '../db/questions.js';     // imports questions wrapper to connect quiz logic to questions.json

// creates a namespace of quiz-related functions.
export const quizService = {
    // gets questions by subject prefix
    getQuestionsBySubject(subjectPrefix) {
        return questions.getAll().filter(q => q.id.startsWith(subjectPrefix));
    },

    // gets questions by a specific index
    getQuestionByIndexForSubject(subjectPrefix, index) {
        const subjectQuestions = this.getQuestionsBySubject(subjectPrefix);
        return subjectQuestions[index] || null;
    },

    // checks the answer of a question
    checkAnswer(questionId, answerIndex) {
        const q = questions.get(questionId);        // gets the question object from questions.json
        return q.correct === answerIndex;       // compares the answer and returns true if correct or false if incorrect
    },

    submitAnswer(playerId, questionId, answerIndex) {
        const correct = this.checkAnswer(questionId, answerIndex);
        if (correct) {
            playerService.updateScore(playerId, 1);
        }

        const allSessions = sessions.getAll();
        const session = allSessions.find(s => s.playerIds.includes(playerId));

        if (session) {
            sessionService.advanceToNextQuestion(session.id);
        }
        
        return {correct};
    }
};

