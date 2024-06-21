import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private network: NetworkService) { }

    getMyProfile(callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/profile/v1/get-my-profile', {}, callback, errorCallback);
    }

    getProfile(username: any, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/profile/v1/get-profile', { username }, callback, errorCallback);
    }

    changeBiography(biography: any, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/profile/v1/change-biography', { biography }, callback, errorCallback);
    }

    changePrivate(isPrivate: any, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/profile/v1/change-is-private', { isPrivate }, callback, errorCallback);
    }

    changeBackgroundImage(backgroundImage: any, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/profile/v1/change-background-image', { backgroundImage }, callback, errorCallback);
    }

    deleteBackgroundImage(callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.network.post('/profile/v1/delete-background-image', { }, callback, errorCallback);
    }
}