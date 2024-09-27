import { Component, Signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../types/models/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class PostListComponent {
  posts: Signal<Post[]>;

  constructor(private postService: PostService) {
    // Convert the Observable to a Signal
    this.posts = toSignal(this.postService.getAll(), { initialValue: [] });
  }

  shortenBody(body: string): string {
    return body.length > 100 ? body.slice(0, 100) + '...' : body;
  }
}
