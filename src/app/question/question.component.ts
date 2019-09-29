import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { IQuestion } from '../models/question.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public question: IQuestion;
  public data: IQuestion[];
  public submit: boolean;
  public page: number;
  public userAnswer: string;
  public isCorrect: boolean;

  private subscription$: Subscription;

  constructor(
    private questionService: QuestionService,
    private router: ActivatedRoute
  ) {
    this.submit = false;
    this.isCorrect = false;
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.initForm();
      this.getQuestion(params.id);
      this.subscription$ = this.form.valueChanges.subscribe(value => this.userAnswer = value.option);
   });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  getQuestion(id: string) {
    return this.questionService.getQuestions()
      .subscribe(question => {
        this.data = question;
        question.map((quest, index) => {
          if (quest.id === id) {
            this.question = quest;
            this.page = index;
          }
        });
      });
  }

  initForm() {
    return this.form = new FormGroup({
      option: new FormControl('')
    });
  }

  submitOn() {
    if (this.userAnswer) {
      this.submit = !this.submit;
      this.isCorrect = this.userAnswer === this.question.answer;
    }
  }

  nextQuestion() {
    if (this.page === 2) {
      this.page = 0;
      this.question = this.data[this.page];
    } else {
      this.question = this.data[this.page + 1];
      this.page = this.page + 1;
    }
    this.submit = false;
  }
}
