import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { BlogService } from '../blog.service';
import { Blog } from '../types/blog';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  blogList: Blog[] = [];
  errors: string[] = [];
  isMobileView: boolean = false;
  
  private destroy$ = new Subject<void>();

  constructor(private sideNavService: SideNavService, private blogService: BlogService, private loaderService: LoaderService, private toastr: ToastrService) {
    this.sideNavService.hideSideNav();
  }

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 428;
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.checkWindowSize();
    this.blogService.getRecentBlogs().pipe(takeUntil(this.destroy$)).subscribe({
      next: (recentBlogs) => {
        this.blogList = recentBlogs;  
        this.loaderService.hide();
      },
      error: (err) => {
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          this.loaderService.hide(); 
          return;
        }
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
