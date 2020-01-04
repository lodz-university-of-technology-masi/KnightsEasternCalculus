export class CloseQuestion {
    question: string;
    correctAnswers: string[] = [];
    incorrectAnswers: string[] = [];
    answerScore: number;

    constructor(question: string, correctAnswers: string[], incorrectAnswers: string[], answerScore: number){
        this.question = question;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.answerScore = answerScore;
    }
}
