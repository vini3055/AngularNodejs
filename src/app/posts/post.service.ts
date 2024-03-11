import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(private http: HttpClient) { }
    private Posts: Post[] = [];

    private postUpdated = new Subject<Post[]>();

    getPosts() {
        // return [...this.Posts]
        this.http.get<{ messages: string, post: Post[] }>('http://localhost:3000/api/posts').subscribe((postData) => {
            this.Posts = postData.post;
            console.log('check console get posts', this.Posts)
            this.postUpdated.next([...this.Posts]);
        })
    }

    getPostUpdateListner() {
        return this.postUpdated.asObservable();
    }
    addPosts(title: string, content: string) {
        // checks if the content / title is same or not
        if (this.Posts.find((x) => x.title == title || x.content == content)) {
            return alert('already existed');
        }
        const post: Post = { id: null, title: title, content: content }
        this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
            console.log(responseData.message);
            this.Posts.push(post);
            this.postUpdated.next([...this.Posts]);
        });
    }
}