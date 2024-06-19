import {Component} from '@angular/core';
import {AvatarComponent} from "../avatar/avatar.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AutoResizeInputDirective} from "../../../directives/auto-resize-input.directive";
import {UserService} from "../../services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  standalone: true,
  imports: [
    AvatarComponent,
    FormsModule,
    NgIf,
    AutoResizeInputDirective
  ]
})
export class ProfileCardComponent {
  biographyText: string = 'Curious to learn new things all the time.';
  fullname: string = "Fatih Ayar";
  username: string = "Fayar";
  isEditModeBoxVisible: boolean = false;
  buttonText: string = "Edit Profile";
  backgroundImage: any;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  editProfileOnclick() {
    if (this.isEditModeBoxVisible) {
      this.saveProfileDetail();
    } else {
      this.buttonText = "Save";
      this.isEditModeBoxVisible = true;
    }
  }
  
  saveProfileDetail(){
    this.saveChangeUsername();
  }

  saveChangeUsername() {
    this.userService.changeUsername(this.username).subscribe(
        response => {
          if (response == "true") {
            this.buttonText = "Edit Profile";
            this.isEditModeBoxVisible = false;
          } else {
            const config = new MatSnackBarConfig();
            config.duration = 5000;
            config.verticalPosition = 'top';
            this.snackBar.open("Bir hata oluştu", 'Close', config);
          }
        },
        error => {
          const config = new MatSnackBarConfig();
          config.duration = 5000;
          config.verticalPosition = 'top';
          this.snackBar.open(error, 'Close', config);
        }
    );
  }
}
