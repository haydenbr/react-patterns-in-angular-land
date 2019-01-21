import { QuizStatus } from './quiz-status.enum';
import { Quiz } from './quiz.interface';

export interface QuizState {
	currentQuestionIndex: number;
	quizStatus: QuizStatus;
	quiz?: Quiz;
}
