import { Injectable } from "@angular/core";
import { Profile } from "../models/profile.model";
import { ProfileService } from "../services/profile.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStore {
    private storageKey = 'profile';

    constructor(private profileService: ProfileService) {
    }

    saveMyProfile(): void {
        let profile;
        this.profileService.getMyProfile((response) => {
            profile = new Profile(response);
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
        });
    }

    getMyProfile(): Profile {
        let profile = localStorage.getItem(this.storageKey);
        return profile ? JSON.parse(profile) : Profile;
    }

    deleteMyProfile(): void {
        localStorage.removeItem(this.storageKey);
    }

    getAvatar() {
        return this.getMyProfile().avatar;
    }

    updateBiography(newBiography: string): void {
        let profile = this.getMyProfile();
        profile.biography = newBiography;
        this.saveUpdatedProfile(profile);
    }

    updateNotificationsEnabled(enabled: boolean): void {
        let profile = this.getMyProfile();
        profile.notificationsEnabled = enabled;
        this.saveUpdatedProfile(profile);
    }

    updateBackgroundImage(newBackgroundImage: string): void {
        let profile = this.getMyProfile();
        profile.backgroundImage = newBackgroundImage;
        this.saveUpdatedProfile(profile);
    }

    updateUsername(newUsername: string): void {
        let profile = this.getMyProfile();
        profile.username = newUsername;
        this.saveUpdatedProfile(profile);
    }

    updateAvatar(avatar: string): void {
        let profile = this.getMyProfile();
        profile.avatar = avatar;
        this.saveUpdatedProfile(profile);
    }

    updateName(newName: string): void {
        let profile = this.getMyProfile();
        profile.name = newName;
        this.saveUpdatedProfile(profile);
    }

    updateSurname(newSurname: string): void {
        let profile = this.getMyProfile();
        profile.surname = newSurname;
        this.saveUpdatedProfile(profile);
    }

    updatePrivate(newPrivate: boolean): void {
        let profile = this.getMyProfile();
        profile.private = newPrivate;
        this.saveUpdatedProfile(profile);
    }

    private saveUpdatedProfile(profile: Profile): void {
        localStorage.setItem(this.storageKey, JSON.stringify(profile));
    }
}