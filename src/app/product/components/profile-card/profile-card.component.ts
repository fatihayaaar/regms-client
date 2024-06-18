import {Component} from '@angular/core';
import {AvatarComponent} from "../avatar/avatar.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AutoResizeInputDirective} from "../../../directives/auto-resize-input.directive";
import {UserService} from "../../services/user.service";

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

  constructor(private userService: UserService) {
  }

  editProfileOnclick() {
    if (this.isEditModeBoxVisible) {
      this.buttonText = "Edit Profile";
      this.isEditModeBoxVisible = false;
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
    this.userService.changeUsername(this.username);
  }
}
