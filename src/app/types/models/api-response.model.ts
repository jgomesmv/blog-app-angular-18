import { Post } from './post.model';

export interface PostListResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostDetailResponse extends Post {}
