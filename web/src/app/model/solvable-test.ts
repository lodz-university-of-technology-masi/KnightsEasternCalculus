import {SolvedOpenQuestion} from './solved-open-question';
import {SolvedCloseQuestion} from './solved-close-question';

export class SolvableTest {
  applicantId: string;
  timestamp: string;
  title: string;
  status: TestStatus;
  openQuestions: SolvedOpenQuestion[];
  closeQuestions: SolvedCloseQuestion[];
  maxScore: number;
  receivedScore: number;


  constructor(applicantId: string, timestamp: string, title: string, status: TestStatus, openQuestions: SolvedOpenQuestion[], closeQuestions: SolvedCloseQuestion[], maxScore: number, receivedScore: number) {
    this.applicantId = applicantId;
    this.timestamp = timestamp;
    this.title = title;
    this.status = status;
    this.openQuestions = openQuestions;
    this.closeQuestions = closeQuestions;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}

export enum TestStatus {
  NotSolved,
  Solved,
  Checked
}
