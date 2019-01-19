import { Answer } from './answer.interface';
import { QuestionType } from './question-type.enum';
import { Response } from './response.interface';

export interface Question {
	questionId: number;
	description: string;
	questionType: QuestionType;
	answers: Answer[];
	response?: Response;
}
