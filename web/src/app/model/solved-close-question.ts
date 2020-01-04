export class SolvedCloseQuestion {
  question: string;
  chosenAnswer: string[];
  possibleAnswer: string[];
  answers: number[];
  maxScore: number;
  receivedScore: number;

  constructor(question: string, chosenAnswer: string[], possibleAnswer: string[], answers: number[], maxScore: number, receivedScore: number) {
    this.question = question;
    this.chosenAnswer = chosenAnswer;
    this.possibleAnswer = possibleAnswer;
    this.answers = answers;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}
