import { Answer } from '../types';

export function getCorrectAnswers(answers: Answer[]): Answer[] {
	return answers.filter((a) => a.isCorrect);
}
