import {Injectable, OnInit} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    public isLoggedIn = false;
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

    public async login(options: any) {
        await this.keycloak.login(options).then(r => {});
    }

    public logout() {
        this.keycloak.logout().then(r => {});
    }

    public getKeycloak() {
        return this.keycloak;
    }
}