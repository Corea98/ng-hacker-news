import { Component, HostListener, OnInit } from '@angular/core';
import { HackerNewsService } from '../service/hacker-news.service';

@Component({
  selector: 'app-hacker-news',
  templateUrl: './hacker-news.component.html',
  styleUrls: ['./hacker-news.component.css']
})
export class HackerNewsComponent {

  get selectedFramework(): string { return this.hackerNewsService.selectedFramework; }
  get filter(): string { return this.hackerNewsService.filter; }

  get pageSelected(): number { return this.hackerNewsService.pageSelected; }
  get pages(): number { return this.hackerNewsService.pages; }
  get paginationShow(): number { return this.hackerNewsService.paginationShow }
  get pagesArrayShow(): number[] { return this.hackerNewsService.pagesArrayShow; }

  set filter(filter: string) { this.hackerNewsService.filter = filter; }

  constructor( private hackerNewsService: HackerNewsService ) {
    this.hackerNewsService.callToApi();
  }

  /**
   * Change selected framework filter from select event.
   * @param {any} event
   */
  changeFrameworkFilter(event: any): void {
    this.hackerNewsService.selectedFramework = event.target.value;
    // Uncomment for go to page 1 every time filter changes
    // this.hackerNewsService.pageSelected = 1;
    
    this.hackerNewsService.callToApi();
  }

  /**
   * Change filter from click.
   * @param {string} filter
   */
  setFilter(filter: string) {
    this.filter = filter;
  }
  
  /**
   * Go to specified page.
   * @param {number} page
   */
  goToPage(page: number) {
    this.hackerNewsService.pageSelected = page;
    this.hackerNewsService.updatePagesArrayShow(window.innerWidth);
    this.hackerNewsService.callToApi();
  }

}
