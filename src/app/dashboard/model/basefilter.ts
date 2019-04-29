export class BaseFilterAttributes {
    constructor(key: string, displayName: string) {
        this.displayName = displayName;
        this.key = key;
    }
    displayName: string;
    key: string;
    selected: boolean;
}
