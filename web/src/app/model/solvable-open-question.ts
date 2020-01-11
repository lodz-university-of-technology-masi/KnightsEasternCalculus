export class SolvableOpenQuestion {
  question: string;
  correctAnswer: string;
  answer: string;
  maxScore: number;
  receivedScore: number;
  
  constructor(question: string, answer: string, maxScore: number, receivedScore: number, correctAnswer: string) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answer = answer;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}
