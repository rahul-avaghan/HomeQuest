import { Property } from '../dashboard/model/property';
import { BaseFilterAttributes } from '../dashboard/model/basefilter';
/**
 * Base filter interface which defines the input and out parameter for filter.
 */
export interface BaseFilter {
    /**
     * filter the values according to custom implementation.
     * @param inputProperties Master list of properties which needs to be filtered.
     * @param filter type of filter which needs to be applied.
     */
    filter(inputProperties: Property[], filter: BaseFilterAttributes[]);
}
