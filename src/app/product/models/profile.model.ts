export class Profile {
    id: string;
    userId: string;
    biography: string | null;
    notificationsEnabled: boolean;
    backgroundImage: string | null;
    username: string;
    avatar: string;
    name: string;
    surname: string;
    private: boolean;
    following: boolean;
    followerCount: number;
    followeeCount: number;

    constructor(data: any) {
        this.id = data.id;
        this.userId = data.userId;
        this.biography = data.biography;
        this.notificationsEnabled = data.notificationsEnabled;
        this.backgroundImage = data.backgroundImage;
        this.username = data.username;
        this.avatar = data.avatar;
        this.name = data.name;
        this.surname = data.surname;
        this.private = data.private;
        this.following = data.following;
        this.followerCount = data.followerCount;
        this.followeeCount = data.followeeCount;
    }
}