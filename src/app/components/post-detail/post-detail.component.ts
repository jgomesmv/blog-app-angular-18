import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../types/models/post.model';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostDetailCommentComponent } from '../post-detail-comment/post-detail-comment.component';
import { PostDetailCommentService } from '../../services/post-detail-comment/post-detail-comment.service';
import { PostDetailCommentModel } from '../../types/models/post-detail-comment.model';

@Component({
  standalone: true,
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  imports: [CommonModule, PostDetailCommentComponent],
})
export class PostDetailComponent {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private postDetailCommentService = inject(PostDetailCommentService);

  post = this.getPost();
  postComments = this.getPostComments();

  private getPost(): Signal<Post | null> {
    const id = +this.route.snapshot.params['id'];
    // Convert the Observable to a Signal
    return toSignal(this.postService.getById(id), { initialValue: null });
  }

  private getPostComments(): Signal<PostDetailCommentModel[]> {
    const id = this.route.snapshot.params['id'];
    return toSignal(this.postDetailCommentService.getByPostId(id), {
      initialValue: [],
    });
  }
}
