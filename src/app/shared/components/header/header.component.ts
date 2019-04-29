import { Component, OnInit } from '@angular/core';
import { SideNavigationService } from '../../services/sidenavigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private sideNavigationService: SideNavigationService) { }
  toggleFilter() {
    this.sideNavigationService.toggle();
  }


}
