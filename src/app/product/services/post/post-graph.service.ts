import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostGraphService {

    constructor(private apollo: Apollo) {}

    createPost(post: Post) {
        return this.apollo.mutate<any>({
            mutation: gql`
                mutation CreatePost($post: PostDto!) {
                  createPost(post: $post) {
                    id
                    text
                    uri
                    username
                    avatar
                    createdDate
                  }
                }
            `, variables: {
                post: post,
            },
        });
    }

    deletePost(post: Post) {
        return this.apollo.mutate({
            mutation: gql`
                mutation DeletePost($post: PostDto!) {
                  delete(post: $post)
                }
            `, variables: {
                post: post,
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
                    text
                    uri
                    username
                    avatar
                    createdDate
                  }
                }
            `,
        });
    }

    getMyPosts(): Observable<any> {
        return this.apollo.query({
            query: gql`
                {
                  getMyPosts {
                    id
                    text
                    uri
                    username
                    avatar
                    createdDate
                  }
                }
            `,
        });
    }

    getPostsByUsername(username: String): Observable<any> {
        return this.apollo.query({
            query: gql`
                 query GetPostsByUsername($username: String!) {
                  getPostsByUsername(username: $username) {
                    id
                    text
                    uri
                    username
                    avatar
                    createdDate
                  }
                }
            `, variables: {
                username: username,
            }
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