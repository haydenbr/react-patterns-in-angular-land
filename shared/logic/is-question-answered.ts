import { Question } from '../types';

export function isQuestionAnswered(question: Question): boolean {
	return !!question.response;
}
