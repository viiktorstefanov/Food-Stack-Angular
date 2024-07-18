import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Blog } from '../types/blog';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { BlogService } from '../blog.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrl: './archives.component.css'
})
export class ArchivesComponent implements OnInit, OnDestroy {

  blogList: Blog[] = [];
  displayedBlogs: Blog[] | undefined;
  errors: string[] = [];

  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sideNavService: SideNavService, private blogService: BlogService, private toastr: ToastrService) {
    this.sideNavService.hideSideNav();
  }

  ngOnInit(): void {
    this.blogService.getAllBlogs().pipe(takeUntil(this.destroy$)).subscribe({
      next: (allBlogs) => {
        this.blogList = allBlogs;
        this.paginator.length = this.blogList.length;
        this.updateDisplayedBlogs();
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

  onPageChange(event: PageEvent) {
    this.updateDisplayedBlogs();
  };

  private updateDisplayedBlogs() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.displayedBlogs = this.blogList.slice(startIndex, endIndex);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
