import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public toggle: boolean;

  constructor() {
    this.toggle = false;
  }

  toggleButton() {
    this.toggle = !this.toggle;
  }
}
