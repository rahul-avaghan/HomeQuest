import { BaseFilter } from './basefilter';
import { Property } from '../dashboard/model/property';
import { BaseFilterAttributes } from '../dashboard/model/basefilter';
import { Injectable } from '@angular/core';
/* Custom filter for commercialization type.
 */
@Injectable()
export class CommercialFilter implements BaseFilter {
    /*
    *
    * filter the values according to custom implementation.
    * @param inputProperties Master list of properties which needs to be filtered.
    * @param filter type of filter which needs to be applied.
    */
    filter(inputProperties: Property[], filter: BaseFilterAttributes[]): Property[] {
        return inputProperties.filter(property => property.commercializationType.key === filter[0].key);
    }
}
