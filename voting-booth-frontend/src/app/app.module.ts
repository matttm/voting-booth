import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatRadioModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import {AppComponent} from './components/app/app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {SplashComponent} from './components/splash/splash.component';
import {BoothComponent} from './components/booth/booth.component';
import {CandidateInfoComponent} from './components/candidate-info/candidate-info.component';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AuthInterceptor} from './services/interceptors/auth/auth.interceptor';
import { ResultComponent } from './components/result/result.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { FailsafeComponent } from './components/failsafe/failsafe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashComponent,
    BoothComponent,
    ResultComponent,
    SubmissionComponent,
    CandidateInfoComponent,
    FailsafeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatListModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CandidateInfoComponent
  ]
})
export class AppModule { }
