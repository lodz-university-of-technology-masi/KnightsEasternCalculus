export class SolvableOpenQuestion {
  question: string;
  correctAnswer: string;
  answer: string;
  maxScore: number;
  receivedScore: number;


  constructor(question: string, correctAnswer: string, answer: string, maxScore: number, receivedScore: number) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answer = answer;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}
