import { Component, OnInit, OnDestroy } from '@angular/core';
import { Feature } from '../model/feature';
import { FeatureService } from '../services/feature.service';
import { PropertyInfoLocalService } from '../services/propertyInfolocal.service';

@Component({
  selector: 'app-housefilter',
  templateUrl: './housefilter.component.html',
  styleUrls: ['./housefilter.component.scss']
})
export class HousefilterComponent implements OnInit {
  featureList: Array<Feature>;
  commercializationTypes = [
    { displayName: 'Rent', selected: false, key: 'RENT' },
    { displayName: 'Buy', selected: false, key: 'BUY' }
  ];

  constructor(private featureService: FeatureService, private propertyInfoService: PropertyInfoLocalService) { }

  ngOnInit() {
    this.featureService.getAllAvaialbleFeatures().subscribe(features => this.featureList = features);
  }

  onChangeOfFilter() {
    this.propertyInfoService.filterProperties(
      this.featureList.filter(feature => feature.selected),
      this.commercializationTypes.filter(commercialization => commercialization.selected).map(k => k.key)
    );
  }
}
