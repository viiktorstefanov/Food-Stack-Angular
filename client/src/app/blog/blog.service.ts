import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Blog } from './types/blog';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService implements OnDestroy {
  private $$blog = new BehaviorSubject<Blog | undefined>(undefined);

  blog: Blog | undefined;
  destroy$ = new Subject<void>();

  constructor(private http: HttpClient) { 
    this.$$blog.pipe(takeUntil(this.destroy$)).subscribe((blog) => {
      this.blog = blog;
    });
   };

   getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>('/api/blog//archives').pipe(takeUntil(this.destroy$));
   };

   getById(id: string) : Observable<Blog> {
    return this.http.get<Blog>(`/api/blog/archives/${id}`).pipe(takeUntil(this.destroy$)).pipe(tap((blog) => this.$$blog.next(blog)));
   };

   deleteById(id: string) {
    return this.http.delete(`/api/blog/archives/${id}`).pipe(takeUntil(this.destroy$));
  };

   createPlace(title : string, city: string, street: string, description: string) {
    return this.http.post('/api/archives/add', {
      title, city, street, description
    }).pipe(takeUntil(this.destroy$));
   };

 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
