import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {ProfileCardComponent} from "../../components/profile-card/profile-card.component";
import {PostSendBoxComponent} from "../../components/post-send-box/post-send-box.component";
import {ActivatedRoute} from "@angular/router";

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
    ]
})
export class ProfileComponent implements OnInit {
    @Input() isMyProfile: boolean = false;
    @Input() username: string = '';

    posts: Post[] = []

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.isMyProfile = params['isMyProfile'] === 'true';
            this.username = params['username'];
        });
    }
}
