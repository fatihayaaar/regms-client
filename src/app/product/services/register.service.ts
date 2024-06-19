import {Injectable} from '@angular/core';
import {environment} from "../../environment";
import {NetworkService} from "./network.service";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private network: NetworkService) {
    }

    register(user: any) {
        return this.network.post(environment.registerEndpoint, {
            "name": user.name,
            "surname": user.surname,
            "uid": user.username,
            "emailAddress": user.mail,
            "password": user.password,
            "gender": "male"
        });
    }
}