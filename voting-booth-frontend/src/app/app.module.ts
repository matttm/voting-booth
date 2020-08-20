import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule, MatFormFieldModule, MatInputModule
} from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { SplashComponent } from './components/splash/splash.component';
import { BoothComponent } from './components/booth/booth.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashComponent,
    BoothComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
