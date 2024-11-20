import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailCommentComponent } from './post-detail-comment.component';

describe('PostDetailCommentComponent', () => {
  let component: PostDetailCommentComponent;
  let fixture: ComponentFixture<PostDetailCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
