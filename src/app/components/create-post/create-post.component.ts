import { Component } from '@angular/core';
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
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter for easier access to form controls in template
  get f() {
    return this.postForm.controls;
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const newPost: Partial<Post> = {
      title: this.f['title'].value,
      body: this.f['body'].value,
      userId: 1 // Assuming userId is required
    };

    this.postService.create(newPost).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
