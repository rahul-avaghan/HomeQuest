import { Component, OnInit } from '@angular/core';
import { Property } from '../model/property';
import { PropertyService } from '../services/property.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-propertystatistics',
  templateUrl: './propertystatistics.component.html',
  styleUrls: ['./propertystatistics.component.scss']
})
export class PropertyStatisticsComponent implements OnInit {
  /* Array holding the chart data. */
  chartData: any[] = [];
  /* Set the width and height of the chart. */
  view: any[] = [350, 350];
  /* Set of colors to display the donut chart.*/
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /*Dependency inject the required services on construction. */
  constructor(private propertyService: PropertyService,
              private breakpointObserver: BreakpointObserver) { }

  /**
   * Subscribe to properties information .
   * And on change of properties information update the graph.
   */
  ngOnInit(): void {
    this.propertyService.getAvailableProperties()
      .subscribe(properties => this.assignStatisticsData(properties));

    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.view = [400, 400];
        }
      });
  }
  /**
   * Calculate the number property per group.
   * @param properties List of properties.
   */
  assignStatisticsData(properties: Property[]): void {
    const calculatedValues = [];
    // Group the property on basis of first two characters in post code.
    // then count the group length and display graph.
    const groupedProperties = this.groupBy(
      properties.filter(p => !isNaN(p.city.postcode))
        .map(p =>
          ({ code: `${p.city.postcode.toString().substr(0, 2)}***`}))
      ,
      'code');
    Object.keys(groupedProperties)
      .map(postcode => calculatedValues.push({ name: postcode, value: groupedProperties[postcode].length }));
    this.chartData = calculatedValues;
  }

  /**
   * Generic group by function on array.
   * @param array - Array which needs to be grouped on basis of some javascript object literal property.
   * @param prop - Javascript object literal property on which the array needs to be grouped.
   */
  groupBy(array: any[], prop: string): {} {
    return array.reduce((groups, item) => {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
}
