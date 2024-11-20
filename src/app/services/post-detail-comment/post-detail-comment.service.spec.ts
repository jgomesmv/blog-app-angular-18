import { TestBed } from '@angular/core/testing';

import { PostDetailCommentService } from './post-detail-comment.service';

describe('PostService', () => {
  let service: PostDetailCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDetailCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
