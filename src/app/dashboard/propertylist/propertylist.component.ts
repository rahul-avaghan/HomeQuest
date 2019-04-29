import { Component, OnInit } from '@angular/core';
import { Property } from '../model/property';
import { PropertyService } from '../services/property.service';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertyListComponent implements OnInit {
  /* Properties array for showing properties🏡 on the UI*/
  properties: Property[];

  /** Hide scroll bar on mobile device and let touch based scroll handle the scrolling. */
  showscrollBar = true;

  /* Id to keep track of hovered card.*/
  hoverId = 0;

  breakpoints = Breakpoints;

  /*Dependency inject the required services on construction. */
  constructor(private propertyService: PropertyService,
              private breakpointObserver: BreakpointObserver) { }

  /**
   * Populate properties 🏡 on initialization of the view.
   */
  ngOnInit() {
    this.propertyService
      .getAvailableProperties()
      .subscribe(properties => this.properties = properties.sort(this.sortByProductType));


    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showscrollBar = false;
        }
        this.showscrollBar = true;

      });
  }

  /**
   * Method to sort properties on basis of ProductType.
   * @param currentValue : Current value of the property.
   * @param nextValue:Next value of the property.
   */
  sortByProductType(currentValue: Property, nextValue: Property) {
    return nextValue.productType.priority - currentValue.productType.priority;
  }

  /**
   * To show icons on image hover.
   * @param  id of the property.
   */
  onMouseEnter(id: number) {
    if (this.hoverId !== id) {
      this.hoverId = id;
    }
  }
}
