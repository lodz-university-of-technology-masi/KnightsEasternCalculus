import { OpenQuestion } from './open-question';
import { CloseQuestion } from './close-question';

export class Test {
    id: string;
    title: string;
    openQuestions: OpenQuestion[] = [];
    closeQuestions: CloseQuestion[] = [];

    constructor(id: string, title: string, openQuestions: OpenQuestion[], closeQuestions: CloseQuestion[]){
        if(id != ""){
            this.id = id;
        }
        this.title = title;
        this.openQuestions = openQuestions;
        this.closeQuestions = closeQuestions;
    }


}