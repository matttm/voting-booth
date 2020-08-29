import { Component, OnInit } from '@angular/core';
import {Results} from "../../types";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  results: Results;

  constructor() {
    this.results['test'] = 80;
    this.results['test2'] = 69;
  }

  ngOnInit() {
  }

}
