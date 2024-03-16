import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class PostService {
    DOMAIN = 'http://localhost:3000';

    constructor(private http: HttpClient, private route: Router) { }

    private Posts: Post[] = [];

    private postUpdated = new Subject<Post[]>();

    getPosts() {
        // return [...this.Posts]
        this.http.get<{ messages: string, post: any[] }>(this.DOMAIN + '/api/posts')
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
        // if (this.Posts.find((x) => x.title == title || x.content == content)) {
        //     return alert('already existed');
        // }
        const post: Post = { id: null, title: title, content: content }
        this.http.post<{ message: string }>(this.DOMAIN + '/api/posts', post).subscribe((responseData) => {
            console.log(responseData.message);
            this.Posts.push(post);
            this.postUpdated.next([...this.Posts]);
            this.route.navigateByUrl("")
        });
    }
    deletPost(id: string) {
        this.http.delete(this.DOMAIN + '/api/posts/' + id).subscribe(() => {
            console.log('Post deleted successfully');
            const updatedPosts = this.Posts.filter((item) => item.id !== id)
            // console.log(' after post deleted', )
            this.Posts = updatedPosts
            this.postUpdated.next([...this.Posts])
        })
    }
    // get details of that particular card once we choose to edit
    getPost(postId: string) {

        return this.http.get<{ _id: string, title: string, content: string }>(this.DOMAIN + '/api/posts/' + postId)

    }


    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content }
        console.log('post update service')
        this.http.put(this.DOMAIN + '/api/posts/' + id, post)
            .subscribe(response => console.log('updatePost response Angular ', response));
        this.route.navigateByUrl("")

    }
}