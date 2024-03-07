import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';


export interface User {
  name: string;
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {

  constructor(public postService: PostService) { }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.title, form.value.content)
    this.postService.addPosts(form.value.title, form.value.content);
    form.resetForm()
  }
}
