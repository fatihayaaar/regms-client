import {Injectable, OnInit} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {state} from "@angular/animations";

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
            console.log(this.userDetail);
        }
    }

    public login(url: any, implicit: boolean = false) {
        this.keycloak.login({
            redirectUri: window.location.origin + url,
        });
    }

    public logout() {
        this.keycloak.logout();
    }

    public getKeycloak() {
        return this.keycloak;
    }

}