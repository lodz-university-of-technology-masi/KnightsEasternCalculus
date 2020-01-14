import { SolvableOpenQuestion } from './solvable-open-question';
import { SolvableCloseQuestion } from './solvable-close-question';
import { SolvableValueQuestion } from './solvable-value-question';

export class TestInstance {
  applicantId: string;
  timestamp: number;
  title: string;
  status: TestStatus;
  openQuestions: SolvableOpenQuestion[];
  closeQuestions: SolvableCloseQuestion[];
  valueQuestions: SolvableValueQuestion[];
  maxScore: number;
  receivedScore: number;

  constructor();
  constructor(
    applicantId: string,
    timestamp: number,
    title: string,
    status: TestStatus,
    openQuestions: SolvableOpenQuestion[],
    closeQuestions: SolvableCloseQuestion[],
    valueQuestions: SolvableValueQuestion[],
    maxScore: number,
    receivedScore: number
    );
  constructor(
    applicantId?: string,
    timestamp?: number,
    title?: string,
    status?: TestStatus,
    openQuestions?: SolvableOpenQuestion[],
    closeQuestions?: SolvableCloseQuestion[],
    valueQuestions?: SolvableValueQuestion[],
    maxScore?: number,
    receivedScore?: number
    ) {
    this.applicantId = applicantId;
    this.timestamp = timestamp;
    this.title = title;
    this.status = status;
    this.openQuestions = openQuestions;
    this.closeQuestions = closeQuestions;
    this.valueQuestions = valueQuestions;
    this.maxScore = maxScore;
    this.receivedScore = receivedScore;
  }
}

export enum TestStatus {
  NotSolved,
  Solved,
  Checked
}
