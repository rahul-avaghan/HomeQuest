import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
// Default route all the routes will directed to dashboard component.
const routes: Routes = [
  { path: '', component: DashboardComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class DashboardRoutingModule { }