import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostService {
    private Posts: Post[] = [];

    private postUpdated = new Subject<Post[]>();

    getPosts() {
        return this.Posts
    }

    getPostUpdateListner() {
        return this.postUpdated.asObservable();
    }

    addPosts(title: string, content: string) {
        // checks if the content / title is same or not
        if (this.Posts.find((x) => x.title == title || x.content == content)) {
            return alert('already existed');
        }
        const post: Post = { title: title, content: content }
        this.Posts.push(post);
        this.postUpdated.next([...this.Posts]);
    }

}