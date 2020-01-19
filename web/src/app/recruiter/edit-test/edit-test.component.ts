import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Test} from '../../model/test';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';
import {OpenQuestion} from '../../model/open-question';
import {CloseQuestion} from '../../model/close-question';
import {ValueQuestion} from '../../model/value-question';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {AssignModalComponent} from '../../common-components/assign-modal/assign-modal.component';
import {DOCUMENT} from '@angular/common';
import {TestService} from '../../services/test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditTestComponent implements OnInit {
  @Input() testId;
  private test: Test;
  private saveInProgress = false;
  private questionErrors = [];
  private errors = {
    noCorrectAnswers: false,
    negativeScores: false,
    generalErrors: false,
    noTitle: false,
    noQuestions: false,
    loadingError: false
  };
  private lookupWord: string;
  private synonyms: string[];
  private synonymSearching = false;

  constructor(private authServie: AuthenticationRecruiterService, private modalService: NgbModal,
              private testService: TestService, private router: Router) { }

  ngOnInit() {
    if (this.testId != null ) {
      this.testService.getTest(this.testId).subscribe(
        res => {
          this.test = res.body as undefined as Test;
        },
        error => {
          this.errors.loadingError = true;
        });
    } else {
      this.test = new Test(this.authServie.getUserId(), null, '', 'pl', [] as OpenQuestion[], [] as CloseQuestion[], [] as ValueQuestion[]);
    }
  }

  searchSynonyms() {
    this.synonymSearching = true;
    this.testService.synonymOfWord(this.lookupWord)
      .subscribe(
        res => {
          console.log(res.body);
          this.synonyms = res.body;
          this.synonymSearching = false;
        },
        (error: HttpErrorResponse) => {
          this.synonymSearching = false;
          console.log(error);
        });
  }

  saveTest() {
    const valid = this.validate();
    if (!valid) {
      this.modalService.dismissAll();
      this.scrollToTop();
      return;
    }

    this.saveInProgress = true;
    this.testService.saveTest(this.test).subscribe(
      res => {
        this.modalService.dismissAll();
        this.router.navigate(['recruiter', 'show-all-tests']);
      },
      error => {
        if ((error as HttpErrorResponse).status === 400) {
          this.errors.generalErrors = true;
        } else {
          console.log(error);
        }
      });
  }

  scrollToTop() {
    (function smoothscroll() { const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                               if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  validate(): boolean { // i tak wyszlo spaghetti :/
    console.log(this.test);
    this.errors.negativeScores = false;
    this.errors.noCorrectAnswers = false;
    this.errors.generalErrors = false;
    this.errors.noTitle = false;
    this.errors.noQuestions = false;
    this.questionErrors = [];

    if (this.test.title.length === 0) {
      this.errors.noTitle = true;
    }
    if (this.test.closeQuestions.length + this.test.openQuestions.length + this.test.valueQuestions.length === 0) {
      this.errors.noQuestions = true;
    }

    const commonValidation = (question) => {
      if (question.answerScore < 1 || question.answerScore === null) {
        this.questionErrors.push(question);
        this.errors.negativeScores = true;
      }
      if (question.question.length === 0) {
        this.questionErrors.push(question);
        this.errors.generalErrors = true;
      }
    };

    this.test.closeQuestions.forEach(question => {
      commonValidation(question);
      if (question.correctAnswers.length < 1) {
        this.questionErrors.push(question);
        this.errors.noCorrectAnswers = true;
      }
      question.correctAnswers.forEach(answer => {
        if (answer.length === 0) {
          this.questionErrors.push(question);
          this.errors.generalErrors = true;
        }
      });
      question.incorrectAnswers.forEach(answer => {
        if (answer.length === 0) {
          this.questionErrors.push(question);
          this.errors.generalErrors = true;
        }
      });
    });

    this.test.openQuestions.forEach(question => {
      commonValidation(question);
      if (question.correctAnswer.length === 0) {
        this.questionErrors.push(question);
        this.errors.generalErrors = true;
      }
    });

    this.test.valueQuestions.forEach(question => {
      commonValidation(question);
      if (question.correctAnswer === null) {
        this.questionErrors.push(question);
        this.errors.generalErrors = true;
      }
    });
    return !(this.errors.noCorrectAnswers || this.errors.negativeScores || this.errors.generalErrors ||
      this.errors.noTitle || this.errors.noQuestions);
  }

  addCloseQuestion() {
    this.test.closeQuestions.push(new CloseQuestion('', [] as string[], [] as string[], 1));
  }

  removeCloseQuestion(index: number) {
    this.test.closeQuestions.splice( index, 1 );
  }

  addGoodAnswer(question: CloseQuestion) {
    question.correctAnswers.push('');
  }

  removeGoodAnswer(question: CloseQuestion, index: number) {
   question.correctAnswers.splice( index, 1 );
  }

  addWrongAnswer(question: CloseQuestion) {
    question.incorrectAnswers.push('');
  }

  removeWrongAnswer(question: CloseQuestion, index: number) {
    question.incorrectAnswers.splice( index, 1 );
  }

  addOpenQuestion() {
    this.test.openQuestions.push(new OpenQuestion('', '', 1));
  }

  removeOpenQuestion(index: number) {
    this.test.openQuestions.splice( index, 1 );
  }

  addValueQuestion() {
    this.test.valueQuestions.push(new ValueQuestion('', 0, 1));
  }

  removeValueQuestion(index: number) {
    this.test.valueQuestions.splice( index, 1 );
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
