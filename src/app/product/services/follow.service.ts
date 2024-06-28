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

    getMyFollowers(callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/follow/v1/my-followers`,(response) => {
            if (callback) callback(response);
        });
    }

    getMyFollowee(callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/follow/v1/my-followee`,(response) => {
            if (callback) callback(response);
        });
    }

    getFollowers(username: any, callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/follow/v1/followers?username=${username}`,(response) => {
            if (callback) callback(response);
        });
    }

    getFollowee(username: any, callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/follow/v1/followee?username=${username}`,(response) => {
            if (callback) callback(response);
        });
    }
}