import { Post } from './post.model';
import { PostDetailCommentModel } from './post-detail-comment.model';

export interface PostListResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostDetailCommentResponse {
  comments: PostDetailCommentModel[];
  total: number;
  skip: number;
  limit: number;
}
