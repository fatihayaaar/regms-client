import {Injectable} from "@angular/core";
import {NetworkService} from "./network.service";

@Injectable({
    providedIn: 'root'
})
export class FollowService {

    constructor(private network: NetworkService) {
    }

    changeBiography(user: any){
        return this.network.post('/profile/v1/change-biography', {});
    }
}