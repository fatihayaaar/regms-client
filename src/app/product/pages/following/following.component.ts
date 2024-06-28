import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {FollowersComponent} from "../../components/followers/followers.component";

@Component({
    selector: 'following-page',
    templateUrl: './following.component.html',
    styleUrl: './following.component.scss',
    standalone: true,
    imports: [ClickableListComponent, FooterComponent, PostComponent, TrendsListComponent, FollowersComponent]
})
export class FollowingComponent implements OnInit {

    selectedTab: string = 'followers';
    isFollowers: boolean = true;

    constructor() {}

    ngOnInit() {}

    selectTab(tab: string): void {
        this.selectedTab = tab;
        this.isFollowers = (tab === 'followers');
    }
}
