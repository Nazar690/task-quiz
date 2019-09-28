import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    return this.form = new FormGroup({
      gender: new FormControl('')
    });
  }
}
