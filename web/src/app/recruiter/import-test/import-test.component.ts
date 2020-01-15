import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import { AuthenticationRecruiterService } from 'src/app/services/authentication-recruiter.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'import-test',
    templateUrl: 'import-test.component.html',
    styleUrls: ['import-test.component.scss']
})
export class ImportTestComponent implements OnInit {

    importedTest: Test;
    backupTest: Test;
    inputTestTitle: string;
    message: string = '';

    constructor(
        private testService: TestService,
        private authService: AuthenticationRecruiterService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.importedTest = this.testService.getImportedTest();
        // throw new Error("Method not implemented.");
    }

    public validate(): boolean {
        this.message = '';

        if (this.importedTest.title == '') {
            this.message += 'Lack of title\n';
            return false;
        }

        for (let i = 0; i < this.importedTest.openQuestions.length; i++) {
            if (this.importedTest.openQuestions[i].correctAnswer == '' || this.importedTest.openQuestions[i].maxScore == null) {
                this.message += 'Lack of correct answers or invalid score number\n';
                return false;
            }
        }

        for (let i = 0; i < this.importedTest.valueQuestions.length; i++) {
            if (this.importedTest.valueQuestions[i].maxScore == null) {
                this.message += 'Invalid score number\n';
                return false;
            }
        }

        for (let i = 0; i < this.importedTest.closeQuestions.length; i++) {
            if (this.importedTest.closeQuestions[i].correctAnswers.length == 0 || this.importedTest.closeQuestions[i].answerScore == null) {
                this.message += 'Lack of correct answers or invalid score number\n';
                return false;
            }
        }

        return true;
    }

    public createTest() {
        this.rewriteCloseAnswers();
        if (this.validate() == true) {
            console.log(this.importedTest);
            // inputTestTitle, author, language, openQuestions, closeQuestions, valueQuestions
            this.testService.createTest(
                this.importedTest.title,
                this.importedTest.language,
                this.importedTest.openQuestions,
                this.importedTest.closeQuestions,
                this.importedTest.valueQuestions
            ).subscribe({
                error: error => ({}),
                complete: () => {
                  this.router.navigate(['/recruiter/show-all-tests']);
                }
              });
        } else {
            this.revertChanges();
        }
    }

    private revertChanges(){
        for (let i = 0; i < this.importedTest.closeQuestions.length; i++) {
            for (let j = 0; j < this.importedTest.closeQuestions[i].correctAnswers.length; j++) {
                this.importedTest.closeQuestions[i].incorrectAnswers.push(this.importedTest.closeQuestions[i].correctAnswers[j]);
            }
            this.importedTest.closeQuestions[i].correctAnswers = [];
        }
    }

    private rewriteCloseAnswers() {
        let element: HTMLInputElement;
        for (let i = 0; i < this.importedTest.closeQuestions.length; i++) {
            for (let j = 0; j < this.importedTest.closeQuestions[i].incorrectAnswers.length; j++) {
                element = document.getElementById(`${i},${j}`) as HTMLInputElement;
                if (element.checked) {
                    this.importedTest.closeQuestions[i].correctAnswers.push(this.importedTest.closeQuestions[i].incorrectAnswers[j]);
                    element.checked = false;
                }
            }
            // console.log(this.importedTest.closeQuestions[i].correctAnswers);

            for (let j = 0; j < this.importedTest.closeQuestions[i].correctAnswers.length; j++) {
                this.importedTest.closeQuestions[i].incorrectAnswers.splice
                    (
                        this.importedTest.closeQuestions[i].incorrectAnswers.indexOf(this.importedTest.closeQuestions[i].correctAnswers[j]),
                        1
                    );
                this.importedTest.closeQuestions[i].correctAnswers.indexOf(element.value)
            }
            // console.log(this.importedTest.closeQuestions[i].incorrectAnswers);
        }
    }
}
