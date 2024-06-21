import { Injectable } from '@angular/core';
import { PostGraphService } from './post-graph.service';
import {Post} from "../../models/post.model";

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor(private graphqlService: PostGraphService) {}

    createPost(post: Post, callback?: () => void) {
        this.graphqlService.createPost(post).subscribe(
            (result) => {
                console.log('Post created:', result.data);
                this.getPosts();
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
                this.getPosts();
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
                this.getPosts();
                if (callback) callback();
            },
            (error) => {
                console.error('Error updating post:', error);
            }
        );
    }

    getPosts() {
        this.graphqlService.getPosts().subscribe(
            (result) => {
                return result.data.getPosts;
            },
            (error) => {
                console.error('Error fetching posts:', error);
            }
        );
    }

    getPostById(id: string) {
        this.graphqlService.getPostById(id).subscribe(
            (result) => {
                return result.data.getPostById;
            },
            (error) => {
                console.error('Error fetching post:', error);
            }
        );
    }
}