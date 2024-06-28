import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Profile } from "../../models/profile.model";
import { Router } from "@angular/router";
import { FollowService } from "../../services/follow.service";
import { ProfileService } from "../../services/profile.service";
import { ProfileStore } from "../../stores/profile.store";
import { NgForOf, NgIf } from '@angular/common';
import {AvatarComponent} from "../avatar/avatar.component";

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.scss'],
    standalone: true,
    imports: [NgForOf, AvatarComponent, NgIf, AvatarComponent],
})
export class FollowersComponent implements OnInit {

    @Input() isFollowers: boolean = false;
    @Input() isMyProfile: boolean = false;
    @Input() username: string = '';

    users: Profile[] = [];
    title: string = "Followers";
    isFollowButtonDisabled = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private followService: FollowService,
        private profileService: ProfileService,
        public profileStore: ProfileStore,
        @Optional() public dialog: MatDialog,
        @Optional() public dialogRef: MatDialogRef<FollowersComponent>
    ) {
        if (data) {
            this.isFollowers = data.isFollowers;
            this.isMyProfile = data.isMyProfile;
            this.username = data.username;
        }
    }

    ngOnInit() {
        if (this.isMyProfile) {
            if (this.isFollowers) {
                this.title = "Followers";
                this.followService.getMyFollowers(
                    (userList) => {
                        for (let user of userList) {
                            this.profileService.getProfileById(user, (response) => {
                                this.users.push(new Profile(response));
                            });
                        }
                    },
                    (error) => {

                    }
                )
            } else {
                this.title = "Followee";
                this.followService.getMyFollowee(
                    (userList) => {
                        for (let user of userList) {
                            this.profileService.getProfileById(user, (response) => {
                                this.users.push(new Profile(response));
                            });
                        }
                    },
                    (error) => {

                    }
                )
            }
        } else {
            if (this.isFollowers) {
                this.title = "Followers";
                this.followService.getFollowers(
                    this.username,
                    (userList) => {
                        for (let user of userList) {
                            this.profileService.getProfileById(user, (response) => {
                                this.users.push(new Profile(response));
                            });
                        }
                    },
                    (error) => {

                    }
                )
            } else {
                this.title = "Followee";
                this.followService.getFollowee(
                    this.username,
                    (userList) => {
                        for (let user of userList) {
                            this.profileService.getProfileById(user, (response) => {
                                this.users.push(new Profile(response));
                            });
                        }
                    },
                    (error) => {

                    }
                )
            }
        }
    }

    toggleFollow(event: any, profile: Profile) {
        if (!this.isFollowButtonDisabled) {
            this.isFollowButtonDisabled = true;
            event.stopPropagation();
            if (profile.following) {
                this.followService.unfollow(profile.username).subscribe(
                    (response) => {
                        profile.following = false;
                        if (this.isMyProfile) {
                            this.profileStore.updateFolloweeCount(this.profileStore.getMyProfile()!.followeeCount - 1)
                        }
                        this.isFollowButtonDisabled = false;
                    }
                );
            } else {
                this.followService.follow(profile.username).subscribe(
                    (response) => {
                        profile.following = true;
                        if (this.isMyProfile) {
                            this.profileStore.updateFolloweeCount(this.profileStore.getMyProfile()!.followeeCount + 1)
                        }
                        this.isFollowButtonDisabled = false;
                    }
                );
            }
        }
    }

    selectUser(data: any) {
        this.router.navigate(['/profile'], {
            queryParams: {
                isMyProfile: false, username: data.username,
            }
        });
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }
}