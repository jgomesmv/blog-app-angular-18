import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types/models/post.model';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends GenericApiService<Post> {
  constructor(http: HttpClient) {
    const baseApiUrl = 'https://dummyjson.com/posts';
    super(http, baseApiUrl);
  }

  protected extractItems(response: any): Post[] {
    return response.posts;
  }
}
