import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormObject} from '../../types';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fields: FormObject[];
  isAuthenticating: boolean;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private snackbar: MatSnackBar,
              private router: Router
  ) {
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
    // TODO: add more customized validators where possible
    this.form = this.fb.group({
      ssn:   ['', Validators.required,
        Validators.pattern('^(?!666|000|9\\\\d{2})\\\\d{3}-(?!00)\\\\d{2}-(?!0{4})\\\\d{4}$')],
      fname: ['', Validators.required, Validators.min(2), Validators.max(20)],
      lname: ['', Validators.required, Validators.min(2), Validators.max(20)],
      zip:   ['', Validators.required, Validators.min(5), Validators.max(5)]
    });
    this.isAuthenticating = false;
  }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.isAuthenticating = true;
      const vals = this.form.value;
      this.auth.login(vals.ssn, vals.fname, vals.lname, vals.zip).then(() => {
        this.isAuthenticating = false;
        console.log('Logging in...');
        // this.router.navigateByUrl('/ballot');
      });
    } else {
      this.snackbar.open('All fields are required', null, { duration: 5000 });
    }
  }
}
