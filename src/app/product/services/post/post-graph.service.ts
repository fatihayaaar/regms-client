import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostGraphService {

    constructor(private apollo: Apollo) {
    }

    createPost(post: Post) {
        return this.apollo.mutate({
            mutation: gql`
                mutation CreatePost($post: PostDto!) {
                  createPost(post: $post) {
                    id
                  }
                }
            `, variables: {
                post: post,
            },
        });
    }

    deletePost(id: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation DeletePost($id: String!) {
                  delete(id: $id)
                }
            `, variables: {
                id: id,
            },
        });
    }

    updatePost(post: any) {
        return this.apollo.mutate({
            mutation: gql`
                mutation UpdatePost($post: PostDto!) {
                  update(post: $post) {
                    id
                  }
                }
            `, variables: {
                post: post,
            },
        });
    }

    getPosts(): Observable<any> {
        return this.apollo.query({
            query: gql`
                {
                  getPosts {
                    id
                    title
                    content
                  }
                }
            `,
        });
    }

    getPostById(id: string): Observable<any> {
        return this.apollo.query({
            query: gql`
                query GetPostById($id: String!) {
                  getPostById(id: $id) {
                    id
                    title
                    content
                  }
                }
            `, variables: {
                id: id,
            },
        });
    }
}