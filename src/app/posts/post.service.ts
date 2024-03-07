import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostService {
    private Posts: Post[] = [];

    getPosts() {
        return this.Posts
        // return this.Posts;
    }
    addPosts(title: string, content: string) {
        const post: Post = { title: title, content: content }
        this.Posts.push(post);

    }
}