import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FoodsComponent } from './foods/foods.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FoodsComponent,
    title: `Foodstack: Foods`,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FoodsRoutingModule { }
