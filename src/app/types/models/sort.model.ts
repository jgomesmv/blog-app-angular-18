import { Post } from './post.model';

export type Order = 'asc' | 'desc';

export type PostSortBy = keyof Post;
