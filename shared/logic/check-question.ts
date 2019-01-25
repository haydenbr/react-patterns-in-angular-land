import { Answer, Question } from '../types';
import { getCorrectAnswers } from './get-correct-answers';

interface checkQuestionSignature {
	question: Question;
	answerIds: number[];
}

export function checkQuestion({ question, answerIds }: checkQuestionSignature): Question {
	let allSelectedAnswersAreCorrect = answerIds.reduce(
		(allCorrect, id) => allCorrect && getAnswerById(question.answers, id).isCorrect,
		true
	);
	let answeredAllCorrectAnswers = getCorrectAnswers(question.answers)
		.filter((a) => !answerIds.includes(a.answerId)).length === 0;
	let isCorrect = allSelectedAnswersAreCorrect && answeredAllCorrectAnswers;

	return { ...question, response: { answerIds, isCorrect } };
}

function getAnswerById(answers: Answer[], answerId: number): Answer {
	return answers.find((a) => a.answerId === answerId);
}
