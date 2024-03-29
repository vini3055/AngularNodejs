import { PostService } from './../post.service';
import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  deleteOnClick(PostId: string) {
    this.postService.deletPost(PostId);
  }
  private postSubscription = new Subscription;
  posts: Post[] = [];

  constructor(public postService: PostService) {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListner().subscribe((post: Post[]) => {
      this.posts = post;
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe()
  }

}
