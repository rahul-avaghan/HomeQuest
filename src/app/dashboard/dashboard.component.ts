import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template:`
    <ng-scrollbar [shown]="'always'">
  <div class="dashboard-container flex-row flex-space-between">
  <div>
    <app-propertyfilter></app-propertyfilter>
  </div>
  <div>
    <app-propertylist></app-propertylist>
  </div>
  <div>
    <app-propertystatistics></app-propertystatistics>
  </div>
</div>
<ng-scrollbar>
`,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
}
