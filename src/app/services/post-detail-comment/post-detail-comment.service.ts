import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericApiService } from '../generic-api.service';
import { PostDetailCommentResponse } from '../../types/models/api-response.model';
import { PostDetailCommentModel } from '../../types/models/post-detail-comment.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostDetailCommentService extends GenericApiService<
  PostDetailCommentResponse,
  PostDetailCommentModel
> {
  protected override baseApiUrl = 'https://dummyjson.com/comments';
  protected override createUrl = '';

  constructor(http: HttpClient) {
    super(http);
  }

  getByPostId(postId: number): Observable<PostDetailCommentModel[]> {
    return this.http
      .get<PostDetailCommentResponse>(`${this.baseApiUrl}/post/${postId}`)
      .pipe(map((response) => response.comments));
  }

  protected extractItems(
    response: PostDetailCommentResponse,
  ): PostDetailCommentModel[] {
    return response.comments;
  }
}
