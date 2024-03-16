import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(private http: HttpClient) { }
    private Posts: Post[] = [];

    private postUpdated = new Subject<Post[]>();

    getPosts() {
        // return [...this.Posts]
        this.http.get<{ messages: string, post: any[] }>('http://localhost:3000/api/posts')
            .pipe(map((postdata) => {
                return postdata.post.map((posts) => {
                    return {
                        title: posts.title,
                        id: posts._id,
                        content: posts.content
                    }
                })
            }))

            .subscribe((postData) => {
                this.Posts = postData;
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
    deletPost(id: string) {
        this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
            console.log('Post deleted successfully');
            const updatedPosts = this.Posts.filter((item) => item.id !== id)
            // console.log(' after post deleted', )
            this.Posts = updatedPosts
            this.postUpdated.next([...this.Posts])
        })
    }

    getPost(postId: string) {
        console.log({ ...this.Posts.find(id => id.id == postId) })
        return { ...this.Posts.find(id => id.id == postId) }

    }

}