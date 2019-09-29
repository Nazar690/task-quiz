import { Component, OnInit } from '@angular/core';
import { QuestionService } from './services/question.service';
import { IQuestion } from './models/question.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public toggle: boolean;
  public questions: IQuestion[];

  constructor(private questionService: QuestionService, private router: Router) {
    this.toggle = false;
  }

  ngOnInit() {
    this.questionService.getQuestions()
      .subscribe(question => this.questions = question);
  }

  toggleButton(): boolean {
    return this.toggle = !this.toggle;
  }

  goToQuestion(question: IQuestion) {
    const link = ['/question', question.id];
    this.router.navigate(link);
  }
}
