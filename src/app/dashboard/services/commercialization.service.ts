import { Injectable } from '@angular/core';
import { CommercializationType } from '../model/commercialization';
import { of, Observable } from 'rxjs';

@Injectable()
export class CommercializationService {
    /** Get all types of commercializations available. */
    getAllAvailableCommercializations(): Observable<CommercializationType[]> {
        return of([
            new CommercializationType('BUY', 'Buy'),
            new CommercializationType('RENT', 'Rent'),
        ]);
    }
}
