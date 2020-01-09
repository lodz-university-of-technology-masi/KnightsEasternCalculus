import { OpenQuestion } from './open-question';
import { CloseQuestion } from './close-question';

export class Test {
    id: string;
    title: string;
    author: string;
    language: string;
    openQuestions: OpenQuestion[] = [];
    closeQuestions: CloseQuestion[] = [];

    constructor(id: string, title: string, author: string, language: string, openQuestions: OpenQuestion[], closeQuestions: CloseQuestion[]) {
        if (id != "") {
            this.id = id;
        }
        this.title = title;
        this.author = author;
        this.language = language;
        this.openQuestions = openQuestions;
        this.closeQuestions = closeQuestions;
    }
}