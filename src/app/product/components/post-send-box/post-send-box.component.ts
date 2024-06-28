import {Component, OnInit} from "@angular/core";
import {AvatarComponent} from "../avatar/avatar.component";
import {PostService} from "../../services/post/post.service";
import {Post} from "../../models/post.model";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProfileStore} from "../../stores/profile.store";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
    selector: 'app-post-send-box',
    templateUrl: './post-send-box.component.html',
    styleUrl: './post-send-box.component.scss',
    standalone: true,
    imports: [AvatarComponent, FormsModule, NgIf,]
})
export class PostSendBoxComponent implements OnInit {
    text: string = '';
    selectedFile: string | ArrayBuffer | null = null;
    errorMessage: string | null = null;
    avatar?: string = "";

    constructor(
        private postService: PostService,
        private profileStore: ProfileStore,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.profileStore.profile$.subscribe(profile => {
            this.avatar = profile?.avatar;
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            if (!allowedTypes.includes(file.type)) {
                alert('Sadece jpeg, png ve jpg dosyaları seçebilirsiniz.');
                return;
            }

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

        let post: Post = {
            text: this.text,
            uri: this.selectedFile as string || '',
        };

        this.postService.createPost(post, () => {
            console.log('Post successfully created!');
            this.resetForm();
        });
    }

    resetForm() {
        this.dialog.closeAll();
        this.showSuccess("Successful");
        this.text = '';
        this.selectedFile = null;
        this.errorMessage = null;
    }

    showSuccess(message: string) {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.verticalPosition = 'top';
        this.snackBar.open(message, 'Close', config);
    }
}