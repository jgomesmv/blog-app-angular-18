import { Component, computed, inject, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../types/models/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Order, PostSortBy } from '../../types/models/sort.model';
import { combineLatest, map, switchMap, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class PostListComponent {
  private postService = inject(PostService);

  limit = signal(30); // Signal for posts per page
  skip = signal(0); // Signal for skipped posts (used for pagination)
  totalPosts = signal(0);

  sortBy = signal<PostSortBy>('title'); // Default sort by title
  order = signal<Order>('asc'); // Default order is ascending

  // Extract posts and totalPosts from the postResponseSignal
  posts = toSignal(
    combineLatest([
      toObservable(this.limit),
      toObservable(this.skip),
      toObservable(this.sortBy),
      toObservable(this.order),
    ]).pipe(
      switchMap(([limit, skip, sortBy, order]) => {
        return this.postService.getPaginated(
          limit as number,
          skip as number,
          sortBy as PostSortBy,
          order as Order,
        );
      }),
      tap((postListResponse) => {
        this.totalPosts.set(postListResponse.total);
      }),
      map((postListResponse) => postListResponse.posts),
    ),
    { initialValue: [] as Post[] },
  );

  // Computed signal to calculate the current page number
  currentPage = computed(() => Math.floor(this.skip() / this.limit()) + 1);

  // Computed signal to calculate the total number of pages
  totalPages = computed(() => Math.ceil(this.totalPosts() / this.limit()));

  // Method to load the next page of posts
  loadNextPage(): void {
    if (this.skip() + this.limit() < this.totalPosts()) {
      this.skip.set(this.skip() + this.limit()); // Increment skip
    }
  }

  // Method to load the previous page of posts
  loadPreviousPage(): void {
    if (this.skip() - this.limit() >= 0) {
      this.skip.set(this.skip() - this.limit()); // Decrement skip
    }
  }

  // Method to change the sorting order
  changeSorting({ target }: Event): void {
    const { value } = target as HTMLSelectElement;
    this.sortBy.set(value as PostSortBy);
  }

  changeOrder({ target }: Event): void {
    const { value } = target as HTMLSelectElement;
    this.order.set(value as Order);
  }

  shortenBody(body?: string): string {
    return (body?.length ?? 0 > 100)
      ? body?.slice(0, 100) + '...'
      : (body ?? '');
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
