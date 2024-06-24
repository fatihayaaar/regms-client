import {Component, Input, OnInit} from '@angular/core';
import {AvatarComponent} from "../avatar/avatar.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AutoResizeInputDirective} from "../../directives/auto-resize-input.directive";
import {UserService} from "../../services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../models/profile.model";
import {DropdownMenuComponent} from "../photo-options-menu/photo-options-menu.component";
import {ProfileStore} from "../../stores/profile.store";
import * as _ from 'lodash';
import {filter} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrl: './profile-card.component.scss',
    standalone: true,
    imports: [AvatarComponent, FormsModule, NgIf, AutoResizeInputDirective, DropdownMenuComponent]
})
export class ProfileCardComponent implements OnInit {

    @Input() isMyProfile: boolean = false;
    @Input() username: string = '';

    profile?: Profile;
    originalProfile?: Profile;
    fullname: string = "null null";
    isEditModeBoxVisible: boolean = false;
    buttonText: string = "Edit Profile";

    constructor(private userService: UserService,
                private profileService: ProfileService,
                private profileStore: ProfileStore,
                private snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute,
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            const navEndEvent = event as NavigationEnd;
            if (navEndEvent.urlAfterRedirects.startsWith('/profile')) {
                this.route.queryParams.subscribe(params => {
                    this.isMyProfile = params['isMyProfile'] === 'true';
                    this.username = params['username'] || '';
                    this.ngOnInit();
                });
            }
        });
    }

    ngOnInit() {
        if (this.profileStore.getMyProfile().username == this.username) this.isMyProfile = true;
        if (this.isMyProfile) {
            this.profile = this.profileStore.getMyProfile();
            this.originalProfile = _.cloneDeep(this.profile);
            this.fullname = `${this.profile!.name} ${this.profile!.surname}`;
        } else {
            this.profileService.getProfile(this.username, (response) => {
                this.profile = new Profile(response);
                this.fullname = `${this.profile!.name} ${this.profile!.surname}`;
            });
        }
    }

    editProfileOnclick() {
        if (!this.isMyProfile) {
            return;
        }

        if (this.isEditModeBoxVisible) {
            this.saveProfileDetail();
        } else {
            this.buttonText = "Save";
            this.isEditModeBoxVisible = true;
        }
    }

    cancelEdit() {
        this.profile = _.cloneDeep(this.originalProfile);

        this.isEditModeBoxVisible = false;
        this.buttonText = "Edit Profile";
    }

    saveProfileDetail() {
        if (!this.isMyProfile) {
            return;
        }

        if (!this.profile!.username || this.profile!.username.trim() === '') {
            this.showError("Username cannot be empty.");
            return;
        }

        let result = this.splitNameAndSurname(this.fullname);
        this.profile!.name = result.name;
        this.profile!.surname = result.surname;

        if (!this.profile!.name || this.profile!.name.trim() === '') {
            this.showError("Name cannot be empty.");
            return;
        }
        if (!this.profile!.surname || this.profile!.surname.trim() === '') {
            this.showError("Surname cannot be empty.");
            return;
        }

        let changesMade = false;

        if (this.profile!.username !== this.originalProfile!.username) {
            this.saveChangeUsername();
            changesMade = true;
        }

        if (this.profile!.name !== this.originalProfile!.name) {
            this.saveChangeName();
            changesMade = true;
        }

        if (this.profile!.surname !== this.originalProfile!.surname) {
            this.saveChangeSurname();
            changesMade = true;
        }

        if (this.profile?.biography !== this.originalProfile?.biography) {
            this.saveChangeBiography();
            changesMade = true;
        }

        if (this.profile?.avatar !== this.originalProfile?.avatar) {
            if (this.profile?.avatar == "assets/images/avatar/profile.png") {
                this.deleteProfileImage();
            } else {
                this.saveProfileImage();
            }
            changesMade = true;
        }

        if (this.profile?.backgroundImage !== this.originalProfile?.backgroundImage) {
            if (this.profile?.backgroundImage == null) {
                this.deleteBackgroundImage();
            } else {
                this.saveBackgroundImage();
            }
            changesMade = true;
        }

        if (!changesMade) {
            this.isEditModeBoxVisible = false;
            this.buttonText = "Edit Profile";
        }
    }


    saveChangeUsername() {
        this.userService.changeUsername(this.profile!.username).subscribe((response) => {
            if (response === true) {
                this.originalProfile!.username = this.profile!.username;
                this.profileStore.updateUsername(this.profile!.username);
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while changing the username.");
            }
        });
    }

    saveChangeBiography() {
        this.profileService.changeBiography(this.profile!.biography).subscribe((response) => {
            if (response === true) {
                this.originalProfile!.biography = this.profile!.biography;
                this.profileStore.updateBiography(this.profile!.biography!);
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while changing the biography.");
            }
        });
    }

    saveChangeName() {
        this.userService.changeName(this.profile!.name).subscribe((response) => {
            if (response === true) {
                this.fullname = `${this.profile!.name} ${this.profile!.surname}`;
                this.originalProfile!.name = this.profile!.name;
                this.profileStore.updateName(this.profile!.name);
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while changing the name.");
            }
        });
    }

    saveChangeSurname() {
        this.userService.changeSurname(this.profile!.surname).subscribe((response) => {
            if (response === true) {
                this.fullname = `${this.profile!.name} ${this.profile!.surname}`;
                this.originalProfile!.surname = this.profile!.surname;
                this.profileStore.updateSurname(this.profile!.surname);
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while changing the surname.");
            }
        });
    }

    onBackgroundImageChanged(newImage: any) {
        this.profile!.backgroundImage = newImage;
    }

    onProfileImageChanged(newImage: string) {
        this.profile!.avatar = newImage;
    }

    saveProfileImage() {
        this.userService.changeAvatar(this.profile!.avatar).subscribe((response) => {
            if (response === true) {
                this.originalProfile!.avatar = this.profile!.avatar;
                this.profileStore.updateAvatar(this.profile!.avatar);
                this.showSuccess("Profile image updated successfully.");
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while updating the profile image.");
            }
        });
    }

    deleteProfileImage() {
        this.userService.deleteAvatar().subscribe((response) => {
            if (response === true) {
                this.showSuccess("Profile image updated successfully.");
            } else {
                this.showError("An error occurred while updating the profile image.");
            }
        });
    }

    saveBackgroundImage() {
        this.profileService.changeBackgroundImage(this.profile!.backgroundImage).subscribe((response) => {
            if (response === true) {
                this.originalProfile!.backgroundImage = this.profile!.backgroundImage;
                this.profileStore.updateBackgroundImage(this.profile!.backgroundImage!);
                this.showSuccess("Background image updated successfully.");
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while updating the background image.");
            }
        });
    }

    deleteBackgroundImage() {
        this.profileService.deleteBackgroundImage().subscribe((response) => {
            if (response === true) {
                this.showSuccess("Background image updated successfully.");
            } else {
                this.showError("An error occurred while updating the background image.");
            }
        });
    }

    showError(message: string) {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.verticalPosition = 'top';
        this.snackBar.open(message, 'Close', config);
    }

    showSuccess(message: string) {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.verticalPosition = 'top';
        this.snackBar.open(message, 'Close', config);
    }

    splitNameAndSurname(input: string): { name: string, surname: string } {
        const words = input.split(' ');
        const surname = words.pop() || '';
        const name = words.join(' ');
        return { name, surname };
    }
}