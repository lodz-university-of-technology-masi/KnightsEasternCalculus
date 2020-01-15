import { OpenQuestion } from './open-question';
import { CloseQuestion } from './close-question';
import { ValueQuestion } from './value-question';

export class Test {
    recruiterId: string;
    testId: number;
    title: string;
    author: string;
    language: string;
    openQuestions: OpenQuestion[] = [];
    closeQuestions: CloseQuestion[] = [];
    valueQuestions: ValueQuestion[] = [];

    constructor(recruiterId: string, testId: number, title: string, language: string, openQuestions: OpenQuestion[], closeQuestions: CloseQuestion[], valueQuestions: ValueQuestion[]) {
        this.testId = testId;
        this.recruiterId = recruiterId;
        this.title = title;
        this.language = language;
        this.openQuestions = openQuestions;
        this.closeQuestions = closeQuestions;
        this.valueQuestions = valueQuestions;
    }
}
