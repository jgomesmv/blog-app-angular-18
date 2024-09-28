import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../types/models/post.model';
import { GenericApiService } from './generic-api.service';
import { PostListResponse } from '../types/models/api-response.model';
import { Observable } from 'rxjs';
import { Order, PostSortBy } from '../types/models/sort.model';

@Injectable({
  providedIn: 'root',
})
export class PostService extends GenericApiService<PostListResponse, Post> {
  protected override baseApiUrl = 'https://dummyjson.com/posts';
  protected override createUrl = 'https://dummyjson.com/posts/add';

  constructor(http: HttpClient) {
    super(http);
  }

  getPaginated(
    limit?: number,
    skip?: number,
    sortBy?: PostSortBy,
    order?: Order,
    select?: string[],
  ): Observable<PostListResponse> {
    let params = new HttpParams();

    if (limit) {
      params = params.set('limit', limit.toString());
    }
    if (skip) {
      params = params.set('skip', skip.toString());
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (order) {
      params = params.set('order', order);
    }
    if (select && select.length) {
      params = params.set('select', select.join(','));
    }

    return this.http.get<PostListResponse>(this.baseApiUrl, { params });
  }

  protected extractItems(response: PostListResponse): Post[] {
    return response.posts;
  }
}
