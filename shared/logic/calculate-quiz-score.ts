import { Quiz } from '../types';

export function calculateQuizScore(quiz: Quiz): number {
	let totalQuestions = quiz.questions.length;
	let totalQuestionsCorrect = quiz.questions.filter((q) => q.response.isCorrect).length;

	return totalQuestionsCorrect / totalQuestions;
}
