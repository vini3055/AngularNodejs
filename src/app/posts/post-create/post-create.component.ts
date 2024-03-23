import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { FormControl, FormGroup, FormsModule, MinLengthValidator, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(public postService: PostService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] })
    })



    this.Loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.Loading = false;
      console.log('parammap', paramMap)
      if (paramMap['has']('postId')) {
        this.mode = 'edit';
        this.postId = paramMap['get']('postId');
        this.postService.getPost(this.postId).subscribe((value) => {
          console.log('get valuess', value)
          this.post = { id: value._id, title: value.title, content: value.content }
          // setting the form if the editing is the purpose
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          })
        })
      } else {
        this.mode = 'create'
        this.postId = null;
      }
    })
  }


  onAddPost() {
    console.log(this.postId)
    console.log(this.mode)
    // if (this.form.invalid) {
    //   return
    // }

    this.Loading = true;
    if (this.mode === 'create') {
      this.Loading = false
      this.postService.addPosts(this.form.value.title, this.form.value.content);
    } else if (this.mode === "edit") {
      this.Loading = false
      console.log('entered edit')

      console.log('this.postId, this.form.value.title, this.form.value.content', this.postId, this.form.value.title, this.form.value.content)
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
      this.postService.getPosts();

    }

    this.form.reset()

  }

}
