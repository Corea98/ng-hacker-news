import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent {

  showList: boolean = false;

  @ViewChild('list') list!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;

  @Input() placeholder: string = "Placeholder";
  @Input() elements: any[] = [];
  @Input() selected: string = "";  

  @Output() change = new EventEmitter<string>();

  get nameDisplay(): string {
    if (this.selected) return this.elements.filter(element => element.value === this.selected)[0].name;
    return this.placeholder;
  }

  constructor( private renderer: Renderer2 ) {    
    this.renderer.listen('window', 'click',(e: Event) => {
      if (e.target !== this.dropdown.nativeElement && e.target !== this.list.nativeElement) {
        this.showList = false;
      }
    });

  }

  toggleList(): void { this.showList = !this.showList; }

  setSelected(element: any): void {
    if (this.selected != element.value) {
      this.selected = element.value;
      this.change.emit(this.selected);
    }
    this.showList = false;
  }

}
