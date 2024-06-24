import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import {Profile} from "../models/profile.model";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private network: NetworkService) { }

    getMyProfile(callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        this.network.get('/profile/v1', (response) => {
            const profile = new Profile(response);
            if (callback) callback(profile);
        }, errorCallback);
    }

    getProfile(username: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        this.network.get(`/profile/v1/${username}`, (response) => {
            const profile = new Profile(response);
            if (callback) callback(profile);
        });
    }

    changeBiography(biography: any) {
        return this.network.put('/profile/v1/change-biography', { "biography": biography });
    }

    changePrivate(isPrivate: any) {
        return this.network.post('/profile/v1/change-is-private', { "isPrivate": isPrivate });
    }

    changeBackgroundImage(backgroundImage: any) {
        return this.network.post('/profile/v1/change-background-image', { "backgroundImage": backgroundImage });
    }

    deleteBackgroundImage() {
        return this.network.post('/profile/v1/delete-background-image', {});
    }
}