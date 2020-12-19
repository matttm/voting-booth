import { Component } from '@angular/core';

@Component({
  selector: 'app-failsafe',
  templateUrl: './failsafe.component.html',
  styleUrls: ['./failsafe.component.css']
})
export class FailsafeComponent {

  isAskingEmail: boolean;

  constructor() {
    this.isAskingEmail = false;
  }

  switchPrompt() {
    this.isAskingEmail = !this.isAskingEmail;
  }
}
