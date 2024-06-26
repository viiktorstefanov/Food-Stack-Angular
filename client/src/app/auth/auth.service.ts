import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { User } from './types/User';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private $$user = new BehaviorSubject<User | undefined>(undefined);

  user: User | undefined;
  destroy$ = new Subject<void>();

  readonly USER_KEY = environment.USER_KEY;

  get isLogged() : boolean {
    return !!this.user;
  };

  isOwner(ownerId: string | undefined) : boolean | undefined {
    return !!(this.user?._id === ownerId);
  };

  get getUserInfo() : User | undefined {
    return this.user;
  };

  constructor(private http: HttpClient) { 
    const storedUser = sessionStorage.getItem(this.USER_KEY);

    if(storedUser) {    
      this.$$user.next(JSON.parse(storedUser));
    };
    
     this.$$user.pipe(takeUntil(this.destroy$)).subscribe((user) => this.user = user); 
  }

  login(email: string, password: string) : Observable<any>{
    return this.http.post<User>('/api/users/login', { email, password });
  };

  register(firstName: string, lastName: string, email: string, password: string, phoneNumber: string) : Observable<any>{
    return this.http.post<User>('/api/users/register', { firstName, lastName, email, password, phoneNumber });
  };

  logout() {
   return this.http.get('/api/users/logout').pipe(tap(() => this.$$user.next(undefined)));
  };

  updateUser(user: User) { 
    this.$$user.next(user);

    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  };

  clearUser() {
    sessionStorage.removeItem(this.USER_KEY);
  };

  ngOnDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
