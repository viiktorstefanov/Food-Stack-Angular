import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { BlogService } from '../blog.service';
import { Blog } from '../types/blog';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {

  blogList: Blog[] = [];
  errors: string[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(private sideNavService: SideNavService, private blogService: BlogService, private toastr: ToastrService) {
    this.sideNavService.hideSideNav();
  }

  ngOnInit(): void {
    this.blogService.getRecentBlogs().pipe(takeUntil(this.destroy$)).subscribe({
      next: (recentBlogs) => {
        this.blogList = recentBlogs;  
      },
      error: (err) => {
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        }
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error'));
      }
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
