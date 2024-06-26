import {Injectable} from "@angular/core";
import {NetworkService} from "./network.service";

@Injectable({
    providedIn: 'root'
})
export class FollowService {

    constructor(private network: NetworkService) {}

    follow(username: any){
        return this.network.post(`/follow/v1/${username}/follow`, {});
    }

    unfollow(username: any){
        return this.network.post(`/follow/v1/${username}/unfollow`, {});
    }
}