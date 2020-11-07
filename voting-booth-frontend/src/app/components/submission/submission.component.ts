import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent {
  @Input()
  conditionVar: boolean;
  @Input()
  submissionText: string;

  constructor() { }
}
