import {SolvableOpenQuestion} from './solvable-open-question';
import {SolvableCloseQuestion} from './solvable-close-question';

export class TestInstance {
  applicantId: string;
  timestamp: string;
  title: string;
  status: TestStatus;
  openQuestions: SolvableOpenQuestion[];
  closeQuestions: SolvableCloseQuestion[];
  maxScore: number;
  receivedScore: number;


  constructor(applicantId: string, timestamp: string, title: string, status: TestStatus, openQuestions: SolvableOpenQuestion[], closeQuestions: SolvableCloseQuestion[], maxScore: number, receivedScore: number) {
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
