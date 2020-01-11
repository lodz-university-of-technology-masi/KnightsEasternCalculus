export class ValueQuestion {
    question: string;
    correctAnswer: number;
    maxScore: number;

    constructor(question: string, correctAnswer: number, maxScore: number) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.maxScore = maxScore;
    }
}
