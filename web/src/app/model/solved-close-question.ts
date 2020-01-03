export class SolvedCloseQuestion {
  question: string;
  correctAnswers: string[];
  incorrectAnswers: string[];
  answers: number[];
  maxScore: number;
  receivedScore: number;

  constructor(question: string, correctAnswers: string[], incorrectAnswers: string[], answers: number[], maxScore: number, receivedScore: number) {
    this.question = question;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.answers = answers;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}
