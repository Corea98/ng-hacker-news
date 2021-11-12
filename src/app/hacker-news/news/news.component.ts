import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../service/hacker-news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  get filter(): string { return this.hackerNewsService.filter; }

  get posts(): any[] { 
    if (this.filter === "all") return this.hackerNewsService.posts
    else return this.hackerNewsService.posts.filter(post => post.liked);
  }
  get fetchingApi(): boolean { return this.hackerNewsService.fetchingApi }

  constructor( private hackerNewsService: HackerNewsService ) { }

  /**
   * Like post by postId.
   * @param {string} postId
   */
  likePost(postId: string) {
    this.hackerNewsService.likePost(postId);
  }

}
