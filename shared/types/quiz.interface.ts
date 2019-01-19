import { Question } from './question.interface';

export interface Quiz {
	quizId: number;
	title: string;
	description: string;
	questions: Question[];
}
