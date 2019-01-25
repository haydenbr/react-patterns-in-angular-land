import { Quiz } from '../types';

export function isQuizComplete(quiz: Quiz) {
	return quiz.questions.filter((q) => !q.response).length === 0;
}
