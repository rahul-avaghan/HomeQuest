import { Component, OnInit } from '@angular/core';
import { Property } from '../model/property';
import { PropertyInfoLocalService } from '../services/propertyInfolocal.service';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';

@Component({
  selector: 'app-houselist',
  templateUrl: './houselist.component.html',
  styleUrls: ['./houselist.component.scss']
})
export class HouselistComponent implements OnInit {
  properties: Property[];
  cityName = 'berlin';
  constructor(private propertyInfoService: PropertyInfoLocalService) { }

  ngOnInit() {
    this.propertyInfoService
      .getPropertyByCityName(this.cityName)
      .subscribe(
        properties => this.properties = properties.sort(this.productTypeSorter));
  }

  productTypeSorter(a: Property, b: Property) {
    return b.productType.priority - a.productType.priority;
  }
}
