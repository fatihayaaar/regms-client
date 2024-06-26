import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MediaDialogComponent} from "../media-dialog/media-dialog.component";
import {AvatarComponent} from "../avatar/avatar.component";
import {DropdownMenuComponent} from "../dropdown-menu/dropdown-menu.component";
import {NgClass, NgStyle} from "@angular/common";
import {Post} from "../../models/post.model";
import {RouterLink} from "@angular/router";
import {formatRelativeDate} from "../../../core/utils/date.util";
import {ProfileStore} from "../../stores/profile.store";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    standalone: true,
    imports: [AvatarComponent, DropdownMenuComponent, NgStyle, NgClass, RouterLink,]
})
export class PostComponent implements OnInit, OnChanges {

    @Input() post: Post | undefined;
    @Input() isMyPost?: boolean;
    @Input() customStyle: any;
    @Input() isPostPage: boolean = false;

    avatar?: string = "";
    isLiked: boolean = false;
    isHovered: boolean = false;
    protected readonly formatRelativeDate = formatRelativeDate;

    constructor(public dialog: MatDialog, private profileStore: ProfileStore) {}

    ngOnInit() {
        this.avatar = this.post?.avatar;

        if (this.isMyPost == null) {
            let username;
            this.profileStore.profile$.subscribe(profile => {
                username = profile?.username;
            });

            if (this.post?.username! == username) {
                this.isMyPost = true;
                this.profileStore.profile$.subscribe(profile => {
                    this.avatar = profile?.avatar;
                });
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['post']) {
            this.avatar = this.post?.avatar;
        }
    }

    onHover(hovered: boolean) {
        this.isHovered = hovered;
    }

    toggleLike() {
        this.isLiked = !this.isLiked;
    }

    openImageDialog(event: MouseEvent, _mediaUrl: any): void {
        event.stopPropagation();
        event.preventDefault();
        this.dialog.open(MediaDialogComponent, {
            data: {
                imageUrl: _mediaUrl
            }
        });
    }
}
