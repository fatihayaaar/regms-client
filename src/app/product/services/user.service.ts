import {Injectable} from '@angular/core';
import {NetworkService} from './network.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private network: NetworkService) {
    }

    search(value: string, callback?: (response: any) => void) {
        return this.network.get(`/user/v1/search?query=${value}`, (response) => {
            if (callback) callback(response);
        });
    }

    changeUsername(username: any) {
        return this.network.post('/user/v1/change-username', {"uid": username});
    }

    changeEmailAddress(email: string) {
        return this.network.post('/user/v1/change-email', {"email": email});
    }

    changeName(name: string) {
        return this.network.post('/user/v1/change-name', {"name": name});
    }

    changeSurname(surname: string) {
        return this.network.post('/user/v1/change-surname', {"surname": surname});
    }

    changeAvatar(avatar: string) {
        return this.network.post('/user/v1/change-avatar', {"avatar": avatar});
    }

    deleteAvatar() {
        return this.network.post('/user/v1/delete-avatar', {});
    }
}