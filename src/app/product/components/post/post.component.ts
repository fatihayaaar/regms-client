import {Component, Input} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MediaDialogComponent} from "../media-dialog/media-dialog.component";
import {AvatarComponent} from "../avatar/avatar.component";
import {DropdownMenuComponent} from "../dropdown-menu/dropdown-menu.component";
import {NgClass, NgStyle} from "@angular/common";
import {Post} from "../../models/post.model";
import {RouterLink} from "@angular/router";
import {formatRelativeDate} from "../../../core/utils/date-util";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  standalone: true,
  imports: [
    AvatarComponent,
    DropdownMenuComponent,
    NgStyle,
    NgClass,
    RouterLink,
  ]
})
export class PostComponent {

  @Input() post: Post | undefined;
  @Input() customStyle: any;

  isLiked: boolean = false;
  isHovered: boolean = false;

  constructor(public dialog: MatDialog) {}

  onHover(hovered: boolean) {
    this.isHovered = hovered;
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  openImageDialog(_mediaUrl: any): void {
    this.dialog.open(MediaDialogComponent, {
      data: {
        imageUrl: _mediaUrl
      }
    });
  }

  protected readonly formatRelativeDate = formatRelativeDate;
}
