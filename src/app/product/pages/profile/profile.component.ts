import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {ProfileCardComponent} from "../../components/profile-card/profile-card.component";
import {PostSendBoxComponent} from "../../components/post-send-box/post-send-box.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ProfileStore} from "../../stores/profile.store";
import {filter, Observable} from "rxjs";
import {PostService} from "../../services/post/post.service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'register',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    standalone: true,
    imports: [
        ClickableListComponent,
        FooterComponent,
        PostComponent,
        TrendsListComponent,
        ProfileCardComponent,
        PostSendBoxComponent,
        AsyncPipe,
    ]
})
export class ProfileComponent implements OnInit {
    @Input() isMyProfile: boolean = false;
    @Input() username: string = '';

    posts: Post[] = [];

    constructor(private router: Router, private route: ActivatedRoute, private profileStore: ProfileStore, private postService : PostService) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            const navEndEvent = event as NavigationEnd;
            if (navEndEvent.urlAfterRedirects.startsWith('/profile')) {
                this.ngOnInit();
            }
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.isMyProfile = params['isMyProfile'] === 'true';
            this.username = params['username'];
        });
        this.profileStore.profile$.subscribe(profile => {
            if (profile!.username == this.username) {
                this.isMyProfile = true;
            }
        });
        this.postService.currentPosts.subscribe(posts => this.posts = posts);
        if (this.isMyProfile) {
            this.postService.getMyPosts().subscribe(posts => this.postService.setPosts(posts));
        } else {
            this.postService.getPostsByUsername(this.username).subscribe(posts => this.postService.setPosts(posts));
        }
    }
}
