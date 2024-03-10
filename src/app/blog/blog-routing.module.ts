import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ArchivesComponent } from './archives/archives.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogComponent,
    title: `Foodstack: Blog`,
  },
  {
    path: 'archives',
    component: ArchivesComponent,
    title: `Foodstack: Blog Archives`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
