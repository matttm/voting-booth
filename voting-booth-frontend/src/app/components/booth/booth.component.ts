import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../../services/voting/voting.service';

/**
 * Component represents the actual voting booth, in which a person
 * nominates a presidential candidates
 */
@Component({
  selector: 'app-booth',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.css']
})
export class BoothComponent implements OnInit {
  candidates: string[];
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private votingService: VotingService
  ) {
    this.candidates = [
      'Jo Jorgenson',
      'Joe Biden',
      'Donald Trump'
    ];
    const groupConfig = {};
    // @ts-ignore
    groupConfig.select = ['', Validators.required];
    this.form = this.fb.group(groupConfig);
  }

  ngOnInit() {
  }

}
