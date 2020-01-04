export class SolvableOpenQuestion {
  question: string;
  answer: string;
  maxScore: number;
  receivedScore: number;
  correctAnswer: string;


  constructor(question: string, answer: string, maxScore: number, receivedScore: number, correctAnswer: string) {
    this.question = question;
    this.answer = answer;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
    this.correctAnswer = correctAnswer;
  }
}
