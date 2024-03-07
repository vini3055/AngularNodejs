import { PostService } from './../post.service';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(public postService: PostService) { }
  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

}
