import {Component} from "@angular/core";
import {AvatarComponent} from "../avatar/avatar.component";

@Component({
  selector: 'app-post-send-box',
  templateUrl: './post-send-box.component.html',
  styleUrl: './post-send-box.component.scss',
  standalone: true,
  imports: [
    AvatarComponent,
  ]
})
export class PostSendBoxComponent {

  selectedFile: any;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFile = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
