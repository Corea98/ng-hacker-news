import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { ComponentsModule } from '../components/components.module';
import { NewsComponent } from './news/news.component';
import { DateTimeAgoPipe } from '../pipes/date-time-ago.pipe';

@NgModule({
  declarations: [
    HackerNewsComponent,
    NewsComponent,
    DateTimeAgoPipe
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
