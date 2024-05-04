import { Routes } from '@angular/router';
import {AuthGuard} from "./services/guard/auth-guard.service";
import {AppLoginPageComponent} from "./pages/app-login-page/app-login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";

export const routes: Routes = [
    { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard]  },
    { path: 'login-page', component: AppLoginPageComponent },
    { path: '**', component: HomePageComponent, canActivate: [AuthGuard]  }
];