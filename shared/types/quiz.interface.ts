import { LabelType } from './label-type.enum';
import { Question } from './question.interface';

export interface Quiz {
	quizId: number;
	title: string;
	description: string;
	labelType: LabelType;
	questions: Question[];
	showAnswers: boolean;
}
