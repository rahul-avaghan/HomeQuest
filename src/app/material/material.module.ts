import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule

} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [CommonModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule
    ],
    providers: [],
})
export class MaterialModule {
}
