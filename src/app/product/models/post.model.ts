export class Post {
  id?: string;
  userId?: string;
  uri?: string;
  text?: string;
  createdDate?: string;
  updatedDate?: string;
  likeCount?: number;
  commentCount?: number;
  visible?: boolean;
  isDeleted?: boolean;
  username?: string;
  avatar?: string;
  isLike?: boolean;

  mediasUrl?: string[];
  content?: string;

  constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}