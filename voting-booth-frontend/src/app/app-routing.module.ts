import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SplashComponent} from './components/splash/splash.component';
import {BoothComponent} from './components/booth/booth.component';
import {ResultComponent} from './components/result/result.component';
import {AuthGuard} from './services/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'booth', component: BoothComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
