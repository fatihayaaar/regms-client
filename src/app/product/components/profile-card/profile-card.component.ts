import {Component, OnInit} from '@angular/core';
import {AvatarComponent} from "../avatar/avatar.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AutoResizeInputDirective} from "../../directives/auto-resize-input.directive";
import {UserService} from "../../services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../models/profile.model";
import {DropdownMenuComponent} from "../photo-options-menu/photo-options-menu.component";

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrl: './profile-card.component.scss',
    standalone: true,
    imports: [AvatarComponent, FormsModule, NgIf, AutoResizeInputDirective, DropdownMenuComponent]
})
export class ProfileCardComponent implements OnInit {

    biographyText: string | undefined = '';
    username: string | undefined = "null";
    name: string | undefined = "null";
    surname: string | undefined = "null";
    backgroundImage: any;
    profileImage: any = "assets/images/avatar/profile.png";

    originalName: string | undefined = "null";
    originalSurname: string | undefined = "null";
    originalUsername: string | undefined = "null";
    originalBiographyText: string | undefined = "";
    originalBackgroundImage: any;
    originalProfileImage: any = "assets/images/avatar/profile.png";

    fullname: string = "null null";

    isEditModeBoxVisible: boolean = false;
    buttonText: string = "Edit Profile";

    constructor(private userService: UserService, private profileService: ProfileService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.profileService.getMyProfile((profile: Profile) => {
            this.name = profile.user?.name;
            this.surname = profile.user?.surname;
            this.username = profile.user?.username;
            this.biographyText = profile.biography;
            this.backgroundImage = profile.backgroundImage;
            this.profileImage = profile.user?.jpegPhoto;
            this.fullname = `${this.name} ${this.surname}`;

            this.originalName = this.name;
            this.originalSurname = this.surname;
            this.originalUsername = this.username;
            this.originalBiographyText = this.biographyText;
            this.originalProfileImage = this.profileImage;
            this.originalBackgroundImage = this.backgroundImage;
        }, (error) => {
            this.showError('Profile could not be loaded.');
        });
    }

    editProfileOnclick() {
        if (this.isEditModeBoxVisible) {
            this.saveProfileDetail();
        } else {
            this.buttonText = "Save";
            this.isEditModeBoxVisible = true;
        }
    }

    cancelEdit() {
        this.name = this.originalName;
        this.surname = this.originalSurname;
        this.username = this.originalUsername;
        this.biographyText = this.originalBiographyText;
        this.fullname = `${this.name} ${this.surname}`;
        this.profileImage = this.originalProfileImage;
        this.backgroundImage = this.originalBackgroundImage;

        this.isEditModeBoxVisible = false;
        this.buttonText = "Edit Profile";
    }

    saveProfileDetail() {
        if (!this.username || this.username.trim() === '') {
            this.showError("Username cannot be empty.");
            return;
        }
        if (!this.name || this.name.trim() === '') {
            this.showError("Name cannot be empty.");
            return;
        }
        if (!this.surname || this.surname.trim() === '') {
            this.showError("Surname cannot be empty.");
            return;
        }

        let changesMade = false;

        if (this.username !== this.originalUsername) {
            this.saveChangeUsername();
            changesMade = true;
        }

        if (this.name !== this.originalName) {
            this.saveChangeName();
            changesMade = true;
        }

        if (this.surname !== this.originalSurname) {
            this.saveChangeSurname();
            changesMade = true;
        }

        if (this.biographyText !== this.originalBiographyText) {
            this.saveChangeBiography();
            changesMade = true;
        }

        if (this.profileImage !== this.originalProfileImage) {
            if (this.profileImage == "assets/images/avatar/profile.png") {
                this.deleteProfileImage();
            } else {
                this.saveProfileImage();
            }
            changesMade = true;
        }

        if (this.backgroundImage !== this.originalBackgroundImage) {
            if (this.backgroundImage == null) {
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
        this.userService.changeUsername(this.username!, (response) => {
            if (response === "true") {
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while changing the username.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    saveChangeBiography() {
        this.profileService.changeBiography(this.biographyText, (response) => {
            if (response === "true") {
                this.buttonText = "Edit Profile";
                this.isEditModeBoxVisible = false;
            } else {
                this.showError("An error occurred while changing the biography.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    saveChangeName() {
        this.userService.changeName(this.name!, (response) => {
            if (response === "true") {
                this.fullname = `${this.name} ${this.surname}`;
            } else {
                this.showError("An error occurred while changing the name.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    saveChangeSurname() {
        this.userService.changeSurname(this.surname!, (response) => {
            if (response === "true") {
                this.fullname = `${this.name} ${this.surname}`;
            } else {
                this.showError("An error occurred while changing the surname.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    onBackgroundImageChanged(newImage: any) {
        this.backgroundImage = newImage;
    }

    onProfileImageChanged(newImage: string) {
        this.profileImage = newImage;
    }

    saveProfileImage() {
        this.userService.changeJpegPhoto(this.profileImage, (response) => {
            if (response === "true") {
                this.showSuccess("Profile image updated successfully.");
            } else {
                this.showError("An error occurred while updating the profile image.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    deleteProfileImage() {
        this.userService.deleteJpegPhoto((response) => {
            if (response === "true") {
                this.showSuccess("Profile image updated successfully.");
            } else {
                this.showError("An error occurred while updating the profile image.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    saveBackgroundImage() {
        this.profileService.changeBackgroundImage(this.backgroundImage, (response) => {
            if (response === "true") {
                this.showSuccess("Background image updated successfully.");
            } else {
                this.showError("An error occurred while updating the background image.");
            }
        }, (error) => {
            this.showError(error);
        });
    }

    deleteBackgroundImage() {
        this.profileService.deleteBackgroundImage((response) => {
            if (response === "true") {
                this.showSuccess("Background image updated successfully.");
            } else {
                this.showError("An error occurred while updating the background image.");
            }
        }, (error) => {
            this.showError(error);
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
}