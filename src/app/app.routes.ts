import {Routes} from '@angular/router';
import {AuthGuard} from "./core/guard/auth-guard.service";
import {AppRegisterPageComponent} from "./pages/app-register-page/app-register-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";

export const routes: Routes = [
    {
        path: 'home-page',
        component: HomePageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login-page',
        component: AppRegisterPageComponent,
    },
    {
        path: '**',
        component: HomePageComponent,
        canActivate: [AuthGuard],
    },
];