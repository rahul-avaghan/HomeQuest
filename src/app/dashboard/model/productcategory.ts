export class ProductCategory {
    constructor(displayName: string) {
        this.priority = displayName === 'L' ? 2 : displayName === 'S' ? 1 : 999;
        this.displayName = displayName;
    }
    priority: number;
    displayName: string;

}
