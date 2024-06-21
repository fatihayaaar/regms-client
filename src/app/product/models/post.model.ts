export interface Post {
  id?: string;
  userId?: string;
  uri?: string;
  text: string;
  createdDate?: string;
  updatedDate?: string;
  likeCount?: number;
  commentCount?: number;
  visible?: boolean;
  isDeleted?: boolean;

  username?: string;
  avatarUrl?: string;
  mediasUrl?: string[];
  content?: string;
}