import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {AsyncPipe, NgIf, NgStyle} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PostService} from "../../services/post/post.service";
import {AvatarComponent} from "../../components/avatar/avatar.component";
import {FormsModule} from "@angular/forms";
import {ProfileStore} from "../../stores/profile.store";
import {DropdownMenuComponent} from "../../components/dropdown-menu/dropdown-menu.component";
import {formatRelativeDate, formatRelativeDateByNeo4j} from "../../../core/utils/date.util";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/comment/comment.model";

@Component({
    selector: 'post',
    templateUrl: './post-page.component.html',
    styleUrl: './post-page.component.scss',
    standalone: true,
    imports: [ClickableListComponent, FooterComponent, PostComponent, TrendsListComponent, AsyncPipe, AvatarComponent, FormsModule, NgIf, DropdownMenuComponent, RouterLink, NgStyle]
})
export class PostPageComponent implements OnInit {

    post?: Post;
    avatar: string | undefined;
    errorMessage: any;
    text: string = '';
    customStyle: any;
    protected readonly formatRelativeDate = formatRelativeDate;
    comments: Comment[] = [];

    constructor(private route: ActivatedRoute, private postService: PostService, private profileStore: ProfileStore, private commentService: CommentService) {
    }

    ngOnInit() {
        this.commentService.currentComments.subscribe(comments => this.comments = comments);
        this.getComments();
        this.avatar = this.profileStore.getAvatar();
    }

    addComment(postId: any, text: any) {
        this.commentService.add(postId, text, () => {
            this.text = "";
            this.getComments();
        })
    }

    getComments() {
        this.route.queryParams.subscribe(params => {
            if (params['postId']) {
                this.postService.getPostById(params['postId']).subscribe(post => this.post = post);
                this.commentService.getComments(params['postId'], (response) => {
                    this.commentService.setComments(response);
                });
            }
        });
    }

    protected readonly formatRelativeDateByNeo4j = formatRelativeDateByNeo4j;
}
