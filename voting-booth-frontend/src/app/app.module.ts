import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule, MatFormFieldModule, MatInputModule, MatRadioModule
} from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { SplashComponent } from './components/splash/splash.component';
import { BoothComponent } from './components/booth/booth.component';
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component';
import {Store, StoreModule} from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {CandidacyService} from "./services/candidacy/candidacy.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashComponent,
    BoothComponent,
    CandidateInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    CandidacyService,
    {
      provide: APP_INITIALIZER,
      useFactory: (cs: CandidacyService) => () => null, //cs.configureApp,
      multi: true,
      deps: [
        CandidacyService,
        HttpClient,
        Store
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
