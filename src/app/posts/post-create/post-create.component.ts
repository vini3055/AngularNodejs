import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';




@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {

  mode = 'create';
  post: Post;
  postId: string;

  constructor(public postService: PostService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log('parammap', paramMap)
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap['get']('postId');
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create'
        this.postId = null;
      }
    })
  }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.title, form.value.content)
    this.postService.addPosts(form.value.title, form.value.content);
    form.resetForm()
  }
}
