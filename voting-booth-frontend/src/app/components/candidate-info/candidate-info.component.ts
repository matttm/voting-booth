import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
export class CandidateInfoComponent implements OnInit {

  @Input()
  candidate: string;

  constructor() { }

  ngOnInit() {
  }

}
