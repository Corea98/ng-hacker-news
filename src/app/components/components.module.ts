import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';



@NgModule({
  declarations: [
    PaginationComponent,
    CustomSelectComponent
  ],
  exports: [
    PaginationComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
