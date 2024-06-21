import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: true,
})
export class AvatarComponent {
  @Input() width: any = 40;
  @Input() height: any = 40;
  @Input() imgSrc = "assets/images/avatar/profile.png";
}
