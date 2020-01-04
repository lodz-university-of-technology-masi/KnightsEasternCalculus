export class SolvableCloseQuestion {
  question: string;
  answers: string[];
  correctAnswers: number[];
  chosenAnswers: number[];
  maxScore: number;
  receivedScore: number;

  constructor(question: string, answers: string[], correctAnswers: number[], chosenAnswers: number[], maxScore: number, receivedScore: number) {
    this.question = question;
    this.answers = answers;
    this.correctAnswers = correctAnswers;
    this.chosenAnswers = chosenAnswers;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}
