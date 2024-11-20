import { Component, input } from '@angular/core';
import { PostDetailCommentModel } from '../../types/models/post-detail-comment.model';

@Component({
  selector: 'app-post-detail-comment',
  standalone: true,
  imports: [],
  templateUrl: './post-detail-comment.component.html',
  styleUrl: './post-detail-comment.component.scss',
})
export class PostDetailCommentComponent {
  postDetailComment = input.required<PostDetailCommentModel>();
}
