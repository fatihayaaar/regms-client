export class PostDto {
    id: string;
    userId: string;

    constructor(id: string, userId: string) {
        this.id = id;
        this.userId = userId;
    }
}