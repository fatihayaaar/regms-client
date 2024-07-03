import {PostDto} from "./post-dto.model";

export class Comment {
    id: number;
    userId: string;
    text: string;
    createdDate: string;
    avatar: string;
    username: string;
    post: PostDto;

    constructor(
        id: number,
        userId: string,
        text: string,
        createdDate: string,
        avatar: string,
        username: string,
        post: PostDto
    ) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.createdDate = createdDate;
        this.avatar = avatar;
        this.username = username;
        this.post = post;
    }
}