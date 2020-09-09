import { Component, OnInit } from '@angular/core';
import {Results} from "../../types";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  results: any[];
  columns: string[];

  constructor() {
    this.columns = ['name', 'votes'];
    this.results = [
      { name: 'test1', votes: 80 },
      { name: 'test2', votes: 47 }
    ];
  }

  ngOnInit() {
  }

}
