import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard } from 'keycloak-angular';
import {AuthService} from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(
        protected override readonly router: Router,
        protected readonly authService: AuthService,
    ) {
        super(router, authService.getKeycloak());
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.authenticated) {
            await this.authService.login(state.url, false);
        }
        const {roles: requiredRoles} = route.data;
        console.log(this.authService.getKeycloak().getToken());
        if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
            return true;
        }
        return requiredRoles.every((role) => this.roles.includes(role));
    }
}
