import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DailyFood, Food } from './types/DailyFood';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnDestroy {
  private $$dailyFoods = new BehaviorSubject<DailyFood[] | undefined>(undefined);

  dailyFoods: DailyFood[] | undefined;
  destroy$ = new Subject<void>();

  constructor(private http: HttpClient) { 
    this.$$dailyFoods.pipe(takeUntil(this.destroy$)).subscribe((dailyFoods) => {
      this.dailyFoods = dailyFoods;
    });
  }

  getAllDailyFoods(date: string): Observable<DailyFood[]> {
    return this.http.get<DailyFood[]>(`/api/diary/?item=${date}`).pipe(takeUntil(this.destroy$));
   };

  searchFoodsByQuery(query: string) {
    return this.http.get<Food[]>(`/api/foods/?item=${query}`).pipe(takeUntil(this.destroy$));
  };

  editDailyFoodQuantity(date: string, foodId: string, newQuantity: number) : Observable<any> {
    return this.http.put<any>(`/api/diary/?item=${date}`, { foodId, quantity: newQuantity }).pipe(takeUntil(this.destroy$));
  };

  deleteDailyFood(date: string, foodId: string) : Observable<any> {
    return this.http.delete<any>(`/api/diary/?item=${date}&foodId=${foodId}`);
  };

  addDailyFood(foodId: string, date: string, quantity: number) {
    return this.http.post<any>(`/api/diary/add`, { foodId, date, quantity }).pipe(takeUntil(this.destroy$));
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
