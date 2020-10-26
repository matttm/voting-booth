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
  snackbarDuration: number;

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
      ssn:   ['' , Validators.required, Validators.pattern('^(?!666|000|9\\\\d{2})\\\\d{3}-(?!00)\\\\d{2}-(?!0{4})\\\\d{4}$')],
      fname: ['' , Validators.required, Validators.min(2), Validators.max(20)],
      lname: ['' , Validators.required, Validators.min(2), Validators.max(20)],
      zip:   ['' , Validators.required, Validators.min(5), Validators.max(5)]
    });
    this.isAuthenticating = false;
    this.snackbarDuration = 5000;
  }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.isAuthenticating = true;
      const vals = this.form.value;
      this.auth.login(vals.ssn, vals.fname, vals.lname, vals.zip)
        .then(res => {
          this.isAuthenticating = false;
          console.log('Logged in');
          this.snackbar
            .open('Login Successful', 'Reset', {duration: this.snackbarDuration});
          this.router.navigateByUrl('/booth');
        })
        .catch(err => {
          this.isAuthenticating = false;
          let message = '';
          const status = err.status;
          if (status === 503) {
            message = 'We are experiencing difficulties';
          } else if (status === 401) {
            message = 'Credentials were not found';
          }
          this.snackbar
            .open(message, null, {duration: this.snackbarDuration})
            .afterDismissed().subscribe(() => this.form.reset());
        });
    } else {
      this.form.markAsTouched();
      this.snackbar
        .open('Form is invalid', null, { duration: this.snackbarDuration });
    }
  }
}
