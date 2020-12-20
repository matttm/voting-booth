import {Component, Inject} from '@angular/core';
import {VotingService} from '../../services/voting/voting.service';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-failsafe',
  templateUrl: './failsafe.component.html',
  styleUrls: ['./failsafe.component.css']
})
export class FailsafeComponent {

  isAskingEmail: boolean;
  email: string;

  constructor(
    private votingService: VotingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isAskingEmail = false;
    this.email = null;
  }

  /**
   * File a failsafe vote to the backend server
   */
  onEmailSubmit() {
    // TODO:do anything with this promise?
    this.votingService.voteFailsafe(this.data.candidate, this.email);
    console.log(`Failsafe vote filed ${this.data.candidate} ${this.email}`);
  }

  /**
   * Switch between email prompt and initial voting prompt
   */
  switchPrompt() {
    this.isAskingEmail = !this.isAskingEmail;
  }
}
