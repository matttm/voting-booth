import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../../services/voting/voting.service';
import {CandidacyService} from "../../services/candidacy/candidacy.service";

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
  hovered: string;
  selected: string;
  isInfoVisible: boolean;
  candidates: string[];
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private candidacyService: CandidacyService,
              private votingService: VotingService
  ) {
    this.hovered = null;
    this.selected = null;
    this.isInfoVisible = false;
    this.candidates = candidacyService.getCandidatesNames();
    const groupConfig = {};
    // @ts-ignore
    groupConfig.select = ['', Validators.required];
    this.form = this.fb.group(groupConfig);
  }

  ngOnInit() {
  }

  vote() {}

  onMouseEnter(name: string) {
    this.isInfoVisible = true;
    this.hovered = name;
  }

  onMouseLeave() {
    this.isInfoVisible = false;
    this.hovered = null;
  }

}
