import {Injectable} from "@angular/core";
import {NetworkService} from "./network.service";

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(private network: NetworkService) {}

    like(postId: any){
        return this.network.post(`/like/v1/like/${postId}`, {});
    }

    unlike(postId: any){
        return this.network.post(`/like/v1/unlike/${postId}`, {});
    }

    getLikesCount(postId: any, callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/like/v1/count/${postId}`,(response) => {
            if (callback) callback(response);
        });
    }

}