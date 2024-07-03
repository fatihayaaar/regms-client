import {Injectable} from "@angular/core";
import {NetworkService} from "./network.service";
import {BehaviorSubject} from "rxjs";
import {Comment} from "../models/comment/comment.model";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    commentSource = new BehaviorSubject<Comment[]>([]);
    currentComments = this.commentSource.asObservable();

    constructor(private network: NetworkService) {}

    add(postId: any, commentText: any, callback?: () => void) {
        return this.network.post(`/comment/v1`, {
            "text": commentText,
            "post": {
                "id": postId,
            },
        }).subscribe(
            (result) => {
                if (callback) callback();
            }
        );
    }

    setComments(comments: Comment[]) {
        this.commentSource.next(comments);
    }

    delete(postId: any){
        return this.network.post(`/comment/v1/delete`, {});
    }

    getComments(postId: any, callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/comment/v1/${postId}`,(response) => {
            if (callback) callback(response);
        });
    }

    getCommentCount(postId: any, callback?: (response: any) => void, errorCallback?: (error: any) => void){
        return this.network.get(`/comment/v1/count/${postId}`,(response) => {
            if (callback) callback(response);
        });
    }

}