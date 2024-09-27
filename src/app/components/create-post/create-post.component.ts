import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../types/models/post.model';

@Component({
  standalone: true,
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreatePostComponent {
  private formBuilder = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  postForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    body: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Getter for easier access to form controls in template
  get formControls() {
    return this.postForm.controls;
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const newPost: Partial<Post> = {
      title: this.formControls['title'].value,
      body: this.formControls['body'].value,
      userId: 1, // Assuming some userId form now
    };

    this.postService.create(newPost).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
