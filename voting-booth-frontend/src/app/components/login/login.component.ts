import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormObject} from '../../types';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../environments/environment';
import {handleError} from '../../utilities';

/**
 * Component is responsible for providing authentication access
 * so a user can vote.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  fields: FormObject[];
  isAuthenticating: boolean;
  errorMap: any;

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
    this.form = this.fb.group({
      ssn:   ['' , [Validators.required, Validators.pattern(/^\d{3}-?\d{2}-?\d{4}$/)]],
      fname: ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lname: ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      zip:   ['' , [Validators.required, Validators.min(10000), Validators.max(99999)]]
    });
    this.isAuthenticating = false;
    this.errorMap = {
      503: 'We are experiencing difficulties',
      401: 'Credentials were not found'
    };
  }

  /**
   * Get all form controls
   */
  get loginFormControls() {
    return this.form.controls;
  }

  /**
   * Submit form if it is valid.
   */
  login() {
    this.isAuthenticating = true;
    const vals = this.form.value;
    this.auth.login(vals.ssn, vals.fname, vals.lname, vals.zip)
      .then(res => {
        this.isAuthenticating = false;
        console.log('Logged in');
        this.snackbar.open('Login Successful', null, {
          duration: environment.snackbarDurationMS,
          panelClass: ['success-snackbar']
        });
        this.router.navigateByUrl('/booth');
      })
      .catch(err => {
        this.isAuthenticating = false;
        handleError(this.snackbar, this.errorMap, err.status, () => this.form.reset());
      });
  }
}
