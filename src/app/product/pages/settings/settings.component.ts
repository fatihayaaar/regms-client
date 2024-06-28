import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {ThemeService} from "../../../core/services/theme.service";
import {AuthService} from "../../../core/services/auth.service";
import {ProfileStore} from "../../stores/profile.store";
import {ProfileService} from "../../services/profile.service";
import {UserService} from "../../services/user.service";
import {response} from "express";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    standalone: true,
    imports: [ClickableListComponent, FooterComponent, PostComponent, TrendsListComponent]
})
export class SettingsComponent implements OnInit {

    isThemeChecked: boolean = true;
    isPrivateChecked: boolean = false;
    isNotificationsChecked: boolean = false;

    constructor(
        private themeService: ThemeService,
        private authService: AuthService,
        private profileStore: ProfileStore,
        private profileService: ProfileService,
        private userService: UserService,
        ) {
    }

    ngOnInit() {
        this.isThemeChecked = this.themeService.getIsDarkTheme();
        this.profileStore.profile$.subscribe(profile => {
            this.isPrivateChecked = profile!.private;
            this.isNotificationsChecked = profile!.notificationsEnabled;
        });
    }

    togglePrivate() {
        this.profileService.changePrivate(!this.isPrivateChecked).subscribe(
            (response) => {
                this.isPrivateChecked = !this.isPrivateChecked;
                this.profileStore.updatePrivate(this.isPrivateChecked);
            }
        );
    }

    toggleNotifications() {
        this.profileService.changeNotifications(!this.isNotificationsChecked).subscribe(
            (response) => {
                this.isNotificationsChecked = !this.isNotificationsChecked;
                this.profileStore.updateNotificationsEnabled(this.isNotificationsChecked);
            }
        );
    }

    toggleTheme() {
        this.isThemeChecked = !this.isThemeChecked;
        this.themeService.toggleTheme();
    }

    logout() {
        this.profileStore.deleteMyProfile();
        this.authService.logout();
    }
}
