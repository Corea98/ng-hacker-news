import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { HackerNewsService } from '../../hacker-news/service/hacker-news.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  // Update pagination elements in UI depending on window width
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hackerNewsService.updatePagesArrayShow(event.target.innerWidth);
  }

  @Input() pageSelected: number = 1;
  @Input() pages: number = 1;
  @Input() paginationShow: number = 3;
  @Input() pagesArrayShow: number[] = [];
  
  @Output() pageChange = new EventEmitter<number>();

  constructor( private hackerNewsService: HackerNewsService) {
    this.goToPage(this.pageSelected);
  }

  /**
   * Go to specified page.
   * @param {number} page
   */
  goToPage(page: number): void {
    if (this.pageSelected == page) return;
    this.pageChange.emit(page);
  }
  
  /**
   * Go to previous page.
   */
  previousPage(): void { if (this.pageSelected > 1) this.goToPage(this.pageSelected - 1); }

  /**
   * Go to next page.
   */
  nextPage(): void { if (this.pageSelected < this.pages) this.goToPage(this.pageSelected + 1); }

  

  

}
