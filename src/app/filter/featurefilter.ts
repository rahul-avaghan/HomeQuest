import { Property } from '../dashboard/model/property';
import { BaseFilterAttributes } from '../dashboard/model/basefilter';
import { BaseFilter } from './basefilter';
import { injectInjector } from '@angular/core/src/render3/di';
import { Injectable } from '@angular/core';
import { Feature } from '../dashboard/model/feature';
/* Custom filter for Feature type.
 */
@Injectable()
export class FeatureFilter implements BaseFilter {

    /*
    *
    * filter the values according to custom implementation.
    * @param inputProperties Master list of properties which needs to be filtered.
    * @param filter type of filter which needs to be applied.
    */
    filter(inputProperties: Property[], filter: BaseFilterAttributes[]): Property[] {
        return inputProperties.filter(property => this.includes(property.features, filter));
    }


    /** Check whether the property contains all selected features */
    includes(availableFeatures: Feature[], selectedFeatures: Feature[]) {
        let includes = true;
        selectedFeatures.forEach(t => {
            if (!availableFeatures.some(available => available.key === t.key)) {
                includes = false;
            }
        });
        return includes;
    }

}
