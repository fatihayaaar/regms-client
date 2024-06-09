import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
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
            await this.authService.login({
                redirectUri: window.location.origin + state.url
            });
        }
        const {roles: requiredRoles} = route.data;

        if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
            return true;
        }
        return requiredRoles.every((role) => this.roles.includes(role));
    }
}
