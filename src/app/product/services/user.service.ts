import {Injectable} from '@angular/core';
import {NetworkService} from './network.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private network: NetworkService) {
    }

    changeUsername(username: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/user/v1/change-username', {username}, callback, errorCallback);
    }

    changeEmailAddress(email: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/user/v1/change-email', {email}, callback, errorCallback);
    }

    changeName(name: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/user/v1/change-name', {name}, callback, errorCallback);
    }

    changeSurname(surname: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/user/v1/change-surname', {surname}, callback, errorCallback);
    }

    changeJpegPhoto(photo: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/user/v1/change-jpeg-photo', {photo}, callback, errorCallback);
    }

    deleteJpegPhoto(callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/user/v1/delete-jpeg-photo', {}, callback, errorCallback);
    }
}