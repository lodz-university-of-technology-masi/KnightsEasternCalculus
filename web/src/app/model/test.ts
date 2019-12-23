import { OpenQuestion } from './open-question';
import { CloseQuestion } from './close-question';

export class Test {
    id: string;
    title: string;
    openQuestions: OpenQuestion[] = [];
    closeQuestions: CloseQuestion[] = [];

    constructor(title: string, openQuestions: OpenQuestion[], closeQuestions: CloseQuestion[]){
        this.title = title;
        this.openQuestions = openQuestions;
        this.closeQuestions = closeQuestions;
    }
}