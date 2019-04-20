import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { HousefilterComponent } from './housefilter/housefilter.component';
import { HouselistComponent } from './houselist/houselist.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PropertyInfoLocalService } from './services/propertyInfolocal.service';
import { FeatureService } from './services/feature.service';
import { PropertystatasticsComponent } from './propertystatastics/propertystatastics.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    RouterModule,
    NgxChartsModule,
    NgScrollbarModule
  ],
  providers: [PropertyInfoLocalService, FeatureService],
  declarations: [
    DashboardComponent,
    HousefilterComponent,
    HouselistComponent,
    PropertystatasticsComponent
  ]
})
export class DashboardModule { }
