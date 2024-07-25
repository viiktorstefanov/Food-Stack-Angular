import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ArchivesArticleDetailsComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('targetElement') targetElement!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  ngAfterViewInit(): void {
  }

  scrollToTarget() {
    if(this.targetElement) {
      this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
}

  id: string = '';
  blog: Blog | undefined;

  errors: string[] | undefined;
  destroy$ = new Subject<void>();
  isMobileView: boolean = false;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private toastr: ToastrService,  private loaderService: LoaderService) {

  }

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 414;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.targetElement) {
        this.scrollToTarget();
      }
    }, 100);
    this.loaderService.show();
    this.checkWindowSize();
    this.id = this.route.snapshot.params['blogId'];
    
    this.blogService.getById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (blog) => {
        this.blog = blog;  
        this.loaderService.hide();
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          this.loaderService.hide(); 
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
