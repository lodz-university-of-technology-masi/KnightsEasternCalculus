export class CloseQuestion {
    question: string;
    correctAnswers: string[] = [];
    incorrectAnswers: string[] = [];
    maxScore: number;

    constructor(question: string, correctAnswers: string[], incorrectAnswers: string[], maxScore: number){
        this.question = question;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.maxScore = maxScore; 
    }
}