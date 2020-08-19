import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

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
      }
    ];
    // TODO: refactor this to rely on this.fields
    this.form = this.fb.group({
      ssn: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const vals = this.form.value;
    this.auth.login(vals.ssn).subscribe( () => {
      console.log('Logging in...');
      // this.router.navigateByUrl('/ballot');
    });
  }
}
