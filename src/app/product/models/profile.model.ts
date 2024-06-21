import {User} from "./user.model";

export interface Profile {
    user?: User;
    biography?: string;
    isPrivate?: boolean;
    notificationsEnabled?: boolean;
    backgroundImage?: string;
}
