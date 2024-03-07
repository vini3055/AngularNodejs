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

  enteredContent = '';
  enteredTitle = '';

  @Output() postCreated = new EventEmitter<Post>();

  // onAddPost(postInput: HTMLTextAreaElement) {
  //   console.dir(postInput.value)
  //   // alert('button clicked');
  //   this.newPost = postInput.value;
  // }
  onAddPost(form: NgForm) {
    // this.newPost = this.enteredValue;
    if (form.invalid) {
      // alert("fields are empty")
      return;
    }
    console.log(form.value.title, form.value.content)
    this.postService.addPosts(form.value.title, form.value.content);
    // const post: Post = {

    //   title: form.value.title,
    //   content: form.value.content
    // }
    // this.postCreated.emit(post);
    // this.clearFunction();
    form.resetForm()
  }
  clearFunction() {
    this.enteredContent = '';
    this.enteredTitle = '';
  }
}
