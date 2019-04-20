import { Component, OnInit } from '@angular/core';
import { PropertyInfoLocalService } from '../services/propertyInfolocal.service';
import { Property } from '../model/property';

@Component({
  selector: 'app-propertystatastics',
  templateUrl: './propertystatastics.component.html',
  styleUrls: ['./propertystatastics.component.scss']
})
export class PropertystatasticsComponent implements OnInit {
  single: any[] = [];
  view: any[] = [310, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  constructor(private propertyInfoLocalService: PropertyInfoLocalService) { }
  ngOnInit(): void {
    this.propertyInfoLocalService.getPropertyByCityName('').subscribe(properties => this.assignStatsticsData(properties));
  }

  assignStatsticsData(properties: Property[]): void {
    const calculatedValues = [];
    const k = this.groupBy(
      properties.filter(p => !isNaN(p.city.postcode))
        .map(p => ({ name: p.city.name, code: p.city.postcode.toString().substr(0, 2), count: 0 }))
      ,
      'code');
    Object.keys(k).map(m => calculatedValues.push({ name: m, value: k[m].length }));
    this.single = calculatedValues;
  }


  groupBy(array: any[], prop: string): {} {
    return array.reduce((groups, item) => {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
}
