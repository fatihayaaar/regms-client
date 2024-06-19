import {Injectable} from '@angular/core';
import {NetworkService} from "./network.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private network: NetworkService) {
    }

    changeUsername(username: string) {
        return this.network.post("/user/v1/change-username", {
            "uid": username,
        });
    }
}