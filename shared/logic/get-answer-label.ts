import { LabelType } from '../types';

interface FunctionSignature {
	answerIndex: number;
	labelType: LabelType;
}

export function getAnswerLabel({ answerIndex, labelType }: FunctionSignature) {
	if (labelType === LabelType.Numeric) {
		return getNumericLabel(answerIndex);
	} else if (labelType === LabelType.Alpha) {
		return getAlphaLabel(answerIndex);
	}
}

function getNumericLabel(answerIndex: number) {
	return answerIndex + 1;
}

function getAlphaLabel(answerIndex) {
	return String.fromCharCode(65 + answerIndex);
}
