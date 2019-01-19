import { Question } from '../types';
import { isQuestionAnswered } from './is-question-answered';

export function isQuestionCorrect(question: Question) {
	return isQuestionAnswered(question) && question.response.isCorrect;
}
