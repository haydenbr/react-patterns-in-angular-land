import { Quiz } from '../types';

export function quizIsComplete(quiz: Quiz) {
	return quiz.questions.filter((q) => q.response).length === 0;
}
