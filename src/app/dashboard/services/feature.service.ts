import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature } from '../model/feature';

@Injectable()
export class FeatureService {
    /** Provides static list of available features.
     * @returns Returns list of available features.
     */
    getAllAvailableFeatures(): Observable<Array<Feature>> {
        const features = [];
        features.push(new Feature('COMMISSION_FREE', 'Commission free'));
        features.push(new Feature('WELL_KEPT', 'Well kept'));
        features.push(new Feature('OFFICE', 'Office'));
        features.push(new Feature('LIFT', 'Commission Lift facility'));
        features.push(new Feature('AIR_CONDITIONING', 'Air conditioning'));
        features.push(new Feature('NETWORK_WIRING', 'Network wiring'));
        features.push(new Feature('PRAXIS', 'Praxis'));
        // returns observable because if this functionality is replaced by real rest client the subscriber
        // won't get affected.
        return of(features);
    }
}
