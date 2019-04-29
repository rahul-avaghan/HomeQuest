import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationService } from './services/sidenavigation.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [SideNavigationService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SideNavigationService]
    };
  }
}
