export class SolvableCloseQuestion {
  question: string;
  answers: string[];
  correctAnswers: number[];
  chosenAnswers: number[];
  answerScore: number;
  receivedScore: number;

  constructor(question: string, answers: string[], chosenAnswers: number[], maxScore: number, receivedScore: number, correctAnswers: number[]) {
    this.question = question;
    this.answers = answers;
    this.correctAnswers = correctAnswers;
    this.chosenAnswers = chosenAnswers;
    this.answerScore = maxScore;
    this.receivedScore = receivedScore;
  }
}
