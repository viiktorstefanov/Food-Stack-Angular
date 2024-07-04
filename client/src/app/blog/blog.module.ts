import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ArchivesComponent } from './archives/archives.component';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { MorePostsComponent } from './more-posts/more-posts.component';
import { BlogRoutingModule } from './blog-routing.module';
import { ArchivesArticleComponent } from './archives/archives-article/archives-article.component';
import { ArchivesArticleDetailsComponent } from './archives/archives-article-details/archives-article-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    BlogComponent, 
    ArchivesComponent, 
    ArticleComponent, 
    MorePostsComponent, 
    ArchivesArticleComponent, 
    ArchivesArticleDetailsComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    MatPaginatorModule,
  ]
})
export class BlogModule { }
