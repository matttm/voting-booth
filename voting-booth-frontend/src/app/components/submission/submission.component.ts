import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  @Input()
  conditionVar: boolean;
  @Input()
  submissionText: string;

  constructor() { }

  ngOnInit() {
  }

}
