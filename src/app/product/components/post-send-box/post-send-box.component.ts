import {Component} from "@angular/core";
import {AvatarComponent} from "../avatar/avatar.component";
import {PostService} from "../../services/post/post.service";
import {Post} from "../../models/post.model";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-post-send-box',
  templateUrl: './post-send-box.component.html',
  styleUrl: './post-send-box.component.scss',
  standalone: true,
  imports: [
    AvatarComponent,
    FormsModule,
    NgIf,
  ]
})
export class PostSendBoxComponent {
  text: string = '';
  selectedFile: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;

  constructor(private postService: PostService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitPost() {
    if (!this.text && !this.selectedFile) {
      this.errorMessage = 'Please enter text or select an image.';
      return;
    }

    const post: Post = {
      text: this.text,
      uri: this.selectedFile as string || ''
    };

    this.postService.createPost(post, () => {
      console.log('Post successfully created!');
      this.resetForm();
    });
  }

  resetForm() {
    this.text = '';
    this.selectedFile = null;
    this.errorMessage = null;
  }
}
