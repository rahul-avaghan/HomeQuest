import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SideNavigationService {
    /* store the state of the panel. */
    isOpen = false;
    /** Common service to handle open and close of filter panel. */
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    /** On toggle flip the state of filter panel. */
    toggle() {
        this.isOpen = !this.isOpen;
        this.change.emit(this.isOpen);
    }
}
