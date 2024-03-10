import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ArchivesComponent } from './archives/archives.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { MorePostsComponent } from './more-posts/more-posts.component';
import { BlogRoutingModule } from './blog-routing.module';
import { ArchivesArticleComponent } from './archives/archives-article/archives-article.component';

@NgModule({
  declarations: [
    BlogComponent, 
    ArchivesComponent, 
    ArticleComponent, 
    MorePostsComponent, ArchivesArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
  ]
})
export class BlogModule { }
