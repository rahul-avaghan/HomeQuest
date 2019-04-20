import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Property } from '../model/property';
import { HttpClient } from '@angular/common/http';
import { City } from '../model/city';
import { RealTor } from '../model/realtor';
import { map } from 'rxjs/operators';
import { Feature } from '../model/feature';
import { debug } from 'util';
import { ProductCategory } from '../model/productcategory';


@Injectable()
export class PropertyInfoLocalService {
  constructor(private http: HttpClient) { }

  properties: Property[] = [];

  propertiesSubject: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);

  getPropertyByCityName(cityName: string): BehaviorSubject<Property[]> {
    this.http
      .get('./assets/properties.json')
      .pipe(
        map(rawInfo => this.parseRawPropertyData(rawInfo))
      ).subscribe(properties => {
        this.properties = properties;
        this.propertiesSubject.next([...properties]);
      });
    return this.propertiesSubject;
  }

  filterProperties(selectedFeatures: Feature[], commercializations: string[]): void {
    let filteredProperties = this.properties;

    if (selectedFeatures.length !== 0) {
      filteredProperties = filteredProperties.filter(property =>
        property.features.filter(feature =>
          selectedFeatures.filter(selectedFeature => feature.key === selectedFeature.key).length > 0
        ).length > 0
      );
    }
    if (commercializations.length !== 0) {
      filteredProperties = filteredProperties.filter(property => commercializations.includes(property.commercializationType));
    }

    this.propertiesSubject.next(filteredProperties);
  }

  private parseRawPropertyData(rawPropertiyList: any): Array<Property> {
    return rawPropertiyList.resultlistEntries.map(rawPropertiy => new Property(
      parseInt(rawPropertiy.id, 10),
      rawPropertiy.addressToDisplay,
      new City(this.parseCityName(rawPropertiy.addressToDisplay), this.parsePincode(rawPropertiy.addressToDisplay)),
      rawPropertiy.pictureUrl,
      rawPropertiy.title,
      this.parseFeatures(rawPropertiy.features),
      new RealTor(rawPropertiy.realtorName, rawPropertiy.realtorCompanyName),
      new ProductCategory(rawPropertiy.productType),
      rawPropertiy.floorSpace,
      rawPropertiy.priceForTotalArea,
      rawPropertiy.commercializationType
    ));
  }
  private parseFeatures(featureStrings: string[]) {
    return featureStrings.map(feature => new Feature(feature, ''));
  }

  private parseCityName(rawAddress: string) {
    return rawAddress.split(' ')[1];
  }

  parsePincode(rawAddress: string): number {
    const pincode = rawAddress && rawAddress.split(' ')[0];
    return parseInt(pincode, 10);
  }

}
