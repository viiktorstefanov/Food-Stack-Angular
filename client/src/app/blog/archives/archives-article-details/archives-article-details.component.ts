import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Blog } from '../../types/blog';
import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'app-archives-article-details',
  templateUrl: './archives-article-details.component.html',
  styleUrl: './archives-article-details.component.css'
})
export class ArchivesArticleDetailsComponent implements OnInit, OnDestroy{

  id: string = '';
  blog: Blog | undefined;

  errors: string[] | undefined;
  destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private blogService: BlogService, private toastr: ToastrService,  private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.loaderService.show();
    this.id = this.route.snapshot.params['blogId'];
    
    this.blogService.getById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (blog) => {
        this.blog = blog;  
        this.loaderService.hide();
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        };
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
        this.loaderService.hide();
      }
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
