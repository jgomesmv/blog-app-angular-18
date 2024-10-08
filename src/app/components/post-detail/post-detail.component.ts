import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../types/models/post.model';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  imports: [CommonModule],
})
export class PostDetailComponent {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  post = this.getPost();

  private getPost(): Signal<Post | null> {
    const id = +this.route.snapshot.params['id'];
    // Convert the Observable to a Signal
    return toSignal(this.postService.getById(id), { initialValue: null });
  }
}
