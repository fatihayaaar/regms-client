import {Injectable, OnInit} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    public isLoggedIn = this.keycloak.isLoggedIn();
    public userDetail: KeycloakProfile | null = null;

    constructor(private keycloak: KeycloakService) {
    }

    public async ngOnInit() {
        this.isLoggedIn = this.keycloak.isLoggedIn();

        if (this.isLoggedIn) {
            this.userDetail = await this.keycloak.loadUserProfile();
        }
    }

    public async login(url: any, implicit: boolean = false) {
        await this.keycloak.login({
            redirectUri: window.location.origin + url,
        });
    }

    public logout() {
        this.keycloak.logout().then(r => {});
    }

    public getKeycloak() {
        return this.keycloak;
    }

}