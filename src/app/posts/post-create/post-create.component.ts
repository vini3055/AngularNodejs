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
  Loading: boolean = true;

  constructor(public postService: PostService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.Loading = true;
    setTimeout(() => {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.Loading = false;
        console.log('parammap', paramMap)
        if (paramMap['has']('postId')) {
          this.mode = 'edit';
          this.postId = paramMap['get']('postId');
          this.postService.getPost(this.postId).subscribe((value) => {
            console.log('get valuess', value)
            this.post = { id: value._id, title: value.title, content: value.content }
          })
        } else {
          this.mode = 'create'
          this.postId = null;
        }
      })
    }, 500);


  }


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === "create") {
      console.log('create onaddpost', this.mode)
      console.log(form.value.title, form.value.content)
      this.postService.addPosts(form.value.title, form.value.content);
    } else {
      console.log(' edit mode ')
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm()
  }
}
