import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    standalone: true,
})
export class AvatarComponent {
    @Input() width: any = 40;
    @Input() height: any = 40;
    @Input() imgSrc: string | undefined = "assets/images/avatar/profile.png";

    get source(): string {
        return this.imgSrc && this.imgSrc.trim() !== "" ? this.imgSrc : "assets/images/avatar/profile.png";
    }
}