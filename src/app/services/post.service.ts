import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types/models/post.model';
import { GenericApiService } from './generic-api.service';
import { PostListResponse } from '../types/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PostService extends GenericApiService<PostListResponse, Post> {
  protected override baseApiUrl = 'https://dummyjson.com/posts';
  protected override createUrl = 'https://dummyjson.com/posts/add';

  constructor(http: HttpClient) {
    super(http);
  }

  protected extractItems(response: PostListResponse): Post[] {
    return response.posts;
  }
}
