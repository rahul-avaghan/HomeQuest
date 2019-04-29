import { Component, OnInit, OnDestroy, HostListener, HostBinding } from '@angular/core';
import { Feature } from '../model/feature';
import { FeatureService } from '../services/feature.service';
import { CommercializationType } from '../model/commercialization';
import { CommercializationService } from '../services/commercialization.service';
import { PropertyService } from '../services/property.service';
import { SideNavigationService } from 'src/app/shared/services/sidenavigation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-propertyfilter',
  templateUrl: './propertyfilter.component.html',
  styleUrls: ['./propertyfilter.component.scss']
})
export class PropertyFilterComponent implements OnInit {
  /** List of features for filter */
  featureList: Feature[];
  /** List of commercialization types for filter */
  commercializationTypes: CommercializationType[];
  selectedCommercialization: string;

  constructor(private featureService: FeatureService,
    private propertyService: PropertyService,
    private commercializationService: CommercializationService,
    private sideNavigationService: SideNavigationService) { }

  numberOfProperties: number;

  /** Binds adds new class to host element on click of menu icon.
   * which hides or shows the filter panel in mobile screen.
   */
  @HostBinding('class.is-open')
  isOpen = false;

  /**
   * On init fetch the feature list and commercialization types.
   */
  ngOnInit() {
    this.featureService.getAllAvailableFeatures()
      .subscribe(features => this.featureList = features);
    this.commercializationService.getAllAvailableCommercializations()
      .subscribe(commercializationTypes => this.commercializationTypes = commercializationTypes);
    this.sideNavigationService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.propertyService.getAvailableProperties().subscribe(t => {
      this.numberOfProperties = t.length;
    });

  }
  /* Apply all the filters
   */
  onFilterChange() {
    const filter = [];
    if (this.selectedCommercialization) {
      filter.push({ type: 'commercialization', value: [new CommercializationType(this.selectedCommercialization, '')] });
    }
    if (this.featureList.some(t => t.selected)) {
      filter.push({ type: 'feature', value: this.featureList.filter(t => t.selected) });
    }
    this.propertyService.filterProperties(filter);
  }

}
