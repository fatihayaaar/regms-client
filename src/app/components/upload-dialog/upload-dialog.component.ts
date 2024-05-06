import {Component} from "@angular/core";
import {PostSendBoxComponent} from "../post-send-box/post-send-box.component";

@Component({
    selector: 'app-upload-dialog',
    templateUrl: 'upload-dialog.component.html',
    styleUrl: 'upload-dialog.component.scss',
    standalone: true,
    imports: [
        PostSendBoxComponent,
    ]
})
export class UploadDialogComponent {

    constructor() {}
}