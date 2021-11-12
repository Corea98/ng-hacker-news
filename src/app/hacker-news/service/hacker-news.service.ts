import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  private _apiUrl: string = "https://hn.algolia.com/api/v1/search_by_date";
  private _selectedFramework: string = "0";
  private _pageSelected: number = 1;
  private _pages: number = 1;
  private _pagesArrayShow: number[] = [];
  private _paginationShow: number = 5;
  private _likedPosts: string[] = [];

  public posts: any[] = [];
  public fetchingApi: boolean = false;
  public filter: string = "all";

  private paginationShowWindowWidth: any[] = [
    { minWidth: 0, maxWidth: 400, paginationShow: 3 },
    { minWidth: 401, maxWidth: 600, paginationShow: 5 },
    { minWidth: 601, maxWidth: 800, paginationShow: 7 },
    { minWidth: 801, maxWidth: 5000, paginationShow: 9 },
  ]

  get selectedFramework(): string { return this._selectedFramework; }
  get pageSelected(): number { return this._pageSelected; }
  get pages(): number { return this._pages; }
  get paginationShow(): number { return this._paginationShow; }
  get pagesArrayShow(): number[] { return this._pagesArrayShow; }

  set selectedFramework(filter: string) { 
    this._selectedFramework = filter; 
    localStorage.setItem("selectedFramework", filter);
  }
  set pageSelected(pageSelected: number) { 
    if (!this.fetchingApi) this._pageSelected = pageSelected; 
  }
  set pages(pages: number) { this._pages = pages; }

  constructor( private http: HttpClient ) { 
    const selectedFramework = localStorage.getItem("selectedFramework");
    if (selectedFramework) this._selectedFramework = selectedFramework;

    const likedPosts = localStorage.getItem("likedPosts");
    if (likedPosts) this._likedPosts = JSON.parse(likedPosts);
  }

  /**
   * Call to algolia api with selected filters in HackerNewsService.
   */
  callToApi() {
    this.fetchingApi = true;
    const query: string = this.selectedFramework !== "0" ? `&query=${ this._selectedFramework }` : "";
    this.http.get(`${ this._apiUrl }?page=${ this._pageSelected - 1 }${ query }`)
    .subscribe((resp: any) => {
      this.posts = resp.hits.map(({ author, story_title, story_url, created_at, objectID }: any) => ({ author, story_title, story_url, created_at, objectID, liked: this._likedPosts.includes(objectID) }))
                            .filter(({ author, story_title, story_url, created_at, objectID }: any) => ( author && story_title && story_url && created_at && objectID ) );

      this._pages = resp.nbPages;
      this.updatePagesArrayShow(window.innerWidth);
      this.fetchingApi = false;
    })
  }

  /**
   * Update pages should be shown with a specific browser width.
   * @param {number} browserWidth
   */
  updatePagesArrayShow(browserWidth: number): void {
    this.paginationShowWindowWidth.map(pageShow => {
      if (browserWidth > pageShow.minWidth && browserWidth < pageShow.maxWidth) {
        this._paginationShow = pageShow.paginationShow;
      }
    })

    let arraypaginationShow: number[] = [];
    
    let firstPageShow = this.pageSelected - Math.floor(this.paginationShow / 2);
    if (firstPageShow < 1) firstPageShow = 1;
    let lastPageShow = firstPageShow + (this.paginationShow - 1);
    if (lastPageShow > this.pages) lastPageShow = this.pages;
    let pages = lastPageShow - firstPageShow + 1;

    while(firstPageShow > 1 && pages != this.paginationShow) {
      firstPageShow -= 1;
      pages += 1;
    }
    
    for (let i = firstPageShow ; i <= lastPageShow ; i++) {
      arraypaginationShow.push(i);
    }
    
    this._pagesArrayShow = arraypaginationShow;
  }

  /**
   * Like post by postId.
   * @param {string} postId
   */
  likePost(postId: string) {
    if (this._likedPosts.includes(postId)) this._likedPosts = this._likedPosts.filter(liked => liked !== postId);
    else this._likedPosts.push(postId);
    this.posts = this.posts.map(({ author, story_title, story_url, created_at, objectID }): any => ({ author, story_title, story_url, created_at, objectID, liked: this._likedPosts.includes(objectID) }));

    localStorage.setItem("likedPosts", JSON.stringify(this._likedPosts));
  }
}
