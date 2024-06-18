import {Routes} from '@angular/router';
import {AuthGuard} from "./core/guard/auth-guard.service";
import {RegisterComponent} from "./product/pages/register/register.component";
import {HomeComponent} from "./product/pages/home/home.component";
import {GuestGuard} from "./core/guard/quest-guard.service";
import {StarterComponent} from "./product/pages/starter/starter.component";
import {ProfileComponent} from "./product/pages/profile/profile.component";

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'starter',
        component: StarterComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];