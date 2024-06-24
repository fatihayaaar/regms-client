import { Injectable } from '@angular/core';
import { PostGraphService } from './post-graph.service';
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor(private graphqlService: PostGraphService) {}

    createPost(post: Post, callback?: () => void) {
        this.graphqlService.createPost(post).subscribe(
            (result) => {
                console.log('Post created:', result.data);
                if (callback) callback();
            },
            (error) => {
                console.error('Error creating post:', error);
            }
        );
    }

    deletePost(id: string, callback?: () => void) {
        this.graphqlService.deletePost(id).subscribe(
            (result) => {
                console.log('Post deleted:', result.data);
                if (callback) callback();
            },
            (error) => {
                console.error('Error deleting post:', error);
            }
        );
    }

    updatePost(post: Post, callback?: () => void) {
        this.graphqlService.updatePost(post).subscribe(
            (result) => {
                console.log('Post updated:', result.data);
                if (callback) callback();
            },
            (error) => {
                console.error('Error updating post:', error);
            }
        );
    }

    getPosts(): Observable<Post[]> {
        return this.graphqlService.getPosts().pipe(
            map(result => result.data.getPosts)
        );
    }

    getMyPosts(): Observable<Post[]> {
        return this.graphqlService.getMyPosts().pipe(
            map(result => result.data.getMyPosts)
        );
    }

    getPostsByUsername(username: string): Observable<Post[]> {
        return this.graphqlService.getPostsByUsername(username).pipe(
            map(result => result.data.getPostsByUsername)
        );
    }

    getPostById(id: string): Observable<Post> {
        return this.graphqlService.getPostById(id).pipe(
            map(result => result.data.getPostById)
        );
    }
}