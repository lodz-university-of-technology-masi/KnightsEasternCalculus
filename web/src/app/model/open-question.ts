export class OpenQuestion {
    question: string;
    correctAnswer: string;
    maxScore: number;

    constructor(question: string, correctAnswer: string, maxScore: number){
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.maxScore = maxScore;
    }
}