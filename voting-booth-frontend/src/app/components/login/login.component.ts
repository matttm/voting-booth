import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormObject} from '../../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fields: FormObject[];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
    this.fields = [
      {
        placeholder: 'XXX-XX-XXXX',
        name: 'ssn',
        displayName: 'Social Security Number'
      },
      {
        placeholder: 'Ameera',
        name: 'fname',
        displayName: 'First Name'
      },
      {
        placeholder: 'Golde',
        name: 'lname',
        displayName: 'Last Name'
      },
      {
        placeholder: '20852',
        name: 'zip',
        displayName: 'Zip Code'
      }
    ];
    const groupConfig = {};
    for (const field of this.fields) {
      groupConfig[field.name] = ['', Validators.required];
    }
    this.form = this.fb.group(groupConfig);
  }

  ngOnInit() {
  }

  login() {
    const vals = this.form.value;
    this.auth.login(vals.ssn, vals.fname, vals.lname, vals.zip).then( () => {
      console.log('Logging in...');
      // this.router.navigateByUrl('/ballot');
    });
  }
}
