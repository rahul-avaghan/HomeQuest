import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  .dashboard-container{
    align-items:stretch;
  }
  `]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
