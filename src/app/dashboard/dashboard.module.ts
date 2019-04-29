import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PropertyService } from './services/property.service';
import { FeatureService } from './services/feature.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PropertyFilterComponent } from './propertyfilter/propertyfilter.component';
import { PropertyListComponent } from './propertylist/propertylist.component';
import { CommercializationService } from './services/commercialization.service';
import { PropertyStatisticsComponent } from './propertystatistics/propertystatistics.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FeatureFilter } from '../filter/featurefilter';
import { CommercialFilter } from '../filter/commercialfilter';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    RouterModule,
    NgxChartsModule,
    NgScrollbarModule,
    LayoutModule
  ],
  providers: [
    PropertyService,
    FeatureService,
    CommercializationService,
    FeatureFilter,
    CommercialFilter
  ],
  declarations: [
    DashboardComponent,
    PropertyFilterComponent,
    PropertyListComponent,
    PropertyStatisticsComponent]
})
/** Lazy loaded module for dashboard functionality. */
export class DashboardModule { }
