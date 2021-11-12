import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { ComponentsModule } from '../components/components.module';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    HackerNewsComponent,
    NewsComponent
  ],
  exports: [
    HackerNewsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class HackerNewsModule {}
