import { Quiz, QuestionType, LabelType } from './types';

export const demoQuiz: Quiz = {
	quizId: 1,
	description: 'boring demo ill make it exciting later',
	title: 'Boring Demo Quiz',
	showAnswers: true,
	labelType: LabelType.Alpha,
	questions: [
		{
			questionId: 1,
			questionType: QuestionType.MultipleResponse,
			description: 'this is a multiple response question',
			answers: [
				{
					answerId: 1,
					description: 'this is correct',
					isCorrect: true
				},
				{
					answerId: 2,
					description: 'this is correct',
					isCorrect: true
				},
				{
					answerId: 3,
					description: 'this is incorrect',
					isCorrect: false
				},
				{
					answerId: 4,
					description: 'this is correct',
					isCorrect: true
				},
				{
					answerId: 5,
					description: 'this is incorrect',
					isCorrect: false
				}
			]
		},
		{
			questionId: 2,
			questionType: QuestionType.SingleResponse,
			description: 'this is a single response question',
			answers: [
				{
					answerId: 6,
					description: 'this is incorrect',
					isCorrect: false
				},
				{
					answerId: 7,
					description: 'this is incorrect',
					isCorrect: false
				},
				{
					answerId: 8,
					description: 'this is correct',
					isCorrect: true
				},
				{
					answerId: 9,
					description: 'this is incorrect',
					isCorrect: false
				}
			]
		},
		{
			questionId: 3,
			questionType: QuestionType.TrueFalse,
			description: 'this is a true/false question',
			answers: [
				{
					answerId: 10,
					description: 'this is correct',
					isTrue: true,
					isCorrect: true
				},
				{
					answerId: 11,
					description: 'this is incorrect',
					isTrue: false,
					isCorrect: false
				}
			]
		}
	]
}

