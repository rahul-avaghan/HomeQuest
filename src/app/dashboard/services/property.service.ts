import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Property } from '../model/property';
import { HttpClient } from '@angular/common/http';
import { City } from '../model/city';
import { RealTor } from '../model/realtor';
import { map } from 'rxjs/operators';
import { Feature } from '../model/feature';
import { ProductCategory } from '../model/productcategory';
import { CommercializationType } from '../model/commercialization';
import { FeatureFilter } from 'src/app/filter/featurefilter';
import { CommercialFilter } from 'src/app/filter/commercialfilter';
import { BaseFilterAttributes } from '../model/baseFilter';
import { MatExpansionPanelDescription } from '@angular/material';


@Injectable()
export class PropertyService {
  /** Store a local copy of properties. */
  private properties: Property[] = [];

  /** Rx js behavior subject object which will be used to
   * send information to subscribers.So that whenever the value changes the subscribes will get
   * information about new available list.
   * On use of .next method the latest information will be broadcasted to all subscribers.
   */
  private propertiesSubject: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);

  /** On construction inject HTTPClient. */
  constructor(private http: HttpClient,
              private featureFilter: FeatureFilter,
              private commercialFilter: CommercialFilter) { }

  /* Gets the value of available properties from json file.
  * @return BehaviorSubject<Property[]> Returns the subject which can be subscribed to get latest results.
  */
  getAvailableProperties(): BehaviorSubject<Property[]> {
    // fetches from local json file stored in asset folder.
    this.http
      .get('./assets/properties.json')
      .pipe(
        map(rawInfo => this.parseRawPropertyData(rawInfo))
      ).subscribe(properties => {
        // store a local copy of properties for local filters.
        this.properties = properties;
        // inform subscribes about change of value.
        this.propertiesSubject.next(properties);
      });
    return this.propertiesSubject;
  }

  /*Filters the available properties one by one.
  * @param filter filter of type BaseFilterAttributes which will be applied on array.
   */
  filterProperties(activeFilters: any[]) {
    let filterProperties = this.properties;

    if (activeFilters.length === 0) {
      this.propertiesSubject.next(this.properties);
      return;
    }
    activeFilters.forEach(t => {
      if (t.type === 'commercialization') {
        // call custom filter function depending on type.
        filterProperties = this.commercialFilter.filter(filterProperties, t.value);
      }
      if (t.type === 'feature') {
        // call custom filter function depending on type.
        filterProperties = this.featureFilter.filter(filterProperties, t.value);
      }
    });
    this.propertiesSubject.next(filterProperties);
  }

  /* Parse the raw data and create a type script class. */
  private parseRawPropertyData(rawPropertyList: any): Array<Property> {
    return rawPropertyList.resultlistEntries.map(rawProperty => new Property(
      parseInt(rawProperty.id, 10),
      rawProperty.addressToDisplay,
      new City(this.parseCityName(rawProperty.addressToDisplay), this.parsePincode(rawProperty.addressToDisplay)),
      rawProperty.pictureUrl,
      rawProperty.title,
      this.parseFeatures(rawProperty.features),
      new RealTor(rawProperty.realtorName, rawProperty.realtorCompanyName),
      new ProductCategory(rawProperty.productType),
      rawProperty.floorSpace,
      rawProperty.priceForTotalArea,
      new CommercializationType(rawProperty.commercializationType, '')
    ));
  }

  /** Parse feature from raw data.Create a new Typescript class. */
  private parseFeatures = (featureStrings: string[]) => featureStrings.map(feature => new Feature(feature, ''));

  /** Separates the city name form string. */
  private parseCityName = (rawAddress: string) => rawAddress ? rawAddress.split(' ')[1] : '';

  /** Separates the city pin code form string. */
  private parsePincode = (rawAddress: string) => rawAddress ? parseInt(rawAddress.split(' ')[0], 10) : NaN;

  /* Get unique items by property name.
   * @param arr is array in which unique items need to be found.
   * @param comp javascript property name
   */
  private getUniqueById(arr, comp) {
    return arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  }
}
