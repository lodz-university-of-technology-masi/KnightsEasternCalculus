export class SolvableValueQuestion {
    question: string;
    correctAnswer: number;
    answer: number;
    maxScore: number;
    receivedScore: number;

    constructor(question: string, answer: number, maxScore: number, receivedScore: number, correctAnswer: number) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answer = answer;
        this.maxScore = maxScore;
        this.receivedScore = receivedScore;
    }
}
