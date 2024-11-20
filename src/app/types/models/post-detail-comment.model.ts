export interface UserModel {
  id: number;
  username: string;
  fullName: string;
}

export interface PostDetailCommentModel {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: UserModel;
}
