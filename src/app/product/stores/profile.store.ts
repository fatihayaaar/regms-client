import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from "../models/profile.model";
import { ProfileService } from "../services/profile.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStore {
    private storageKey = 'profile';
    private profileSubject: BehaviorSubject<Profile | null>;
    public profile$: Observable<Profile | null>;

    constructor(private profileService: ProfileService) {
        const storedProfile = localStorage.getItem(this.storageKey);
        this.profileSubject = new BehaviorSubject<Profile | null>(storedProfile ? JSON.parse(storedProfile) : null);
        this.profile$ = this.profileSubject.asObservable();
    }

    saveMyProfile(): void {
        this.profileService.getMyProfile((response) => {
            const profile = new Profile(response);
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.profileSubject.next(profile);
        });
    }

    getMyProfile(): Profile | null {
        return this.profileSubject.value;
    }

    deleteMyProfile(): void {
        localStorage.removeItem(this.storageKey);
        this.profileSubject.next(null);
    }

    getAvatar(): string | undefined {
        return this.getMyProfile()?.avatar;
    }

    updateBiography(newBiography: string): void {
        this.updateProfileField('biography', newBiography);
    }

    updateNotificationsEnabled(enabled: boolean): void {
        this.updateProfileField('notificationsEnabled', enabled);
    }

    updateBackgroundImage(newBackgroundImage: string): void {
        this.updateProfileField('backgroundImage', newBackgroundImage);
    }

    updateUsername(newUsername: string): void {
        this.updateProfileField('username', newUsername);
    }

    updateAvatar(avatar: string): void {
        this.updateProfileField('avatar', avatar);
    }

    updateName(newName: string): void {
        this.updateProfileField('name', newName);
    }

    updateSurname(newSurname: string): void {
        this.updateProfileField('surname', newSurname);
    }

    updatePrivate(newPrivate: boolean): void {
        this.updateProfileField('private', newPrivate);
    }

    updateFollowerCount(newCount: number): void {
        this.updateProfileField('followerCount', newCount);
    }

    updateFolloweeCount(newCount: number): void {
        this.updateProfileField('followeeCount', newCount);
    }

    private updateProfileField<K extends keyof Profile>(field: K, value: Profile[K]): void {
        const profile = this.getMyProfile();
        if (profile) {
            profile[field] = value;
            this.saveUpdatedProfile(profile);
        }
    }

    private saveUpdatedProfile(profile: Profile): void {
        localStorage.setItem(this.storageKey, JSON.stringify(profile));
        this.profileSubject.next(profile);
    }
}