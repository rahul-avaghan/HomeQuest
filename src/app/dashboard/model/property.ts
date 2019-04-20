import { RealTor } from './realtor';
import { Feature } from './feature';
import { City } from './city';
import { ProductCategory } from './productcategory';
export class Property {
    constructor(
        id: number,
        address: string,
        city: City,
        pictureUrl: URL,
        title: string,
        features: Array<Feature>,
        relator: RealTor,
        productType: ProductCategory,
        floorSpace: string,
        priceForTotalArea: string,
        commercializationType: string
    ) {

        this.id = id;
        this.address = address;
        this.city = city;
        this.pictureUrl = pictureUrl;
        this.title = title;
        this.features = features;
        this.relator = relator;
        this.productType = productType;
        this.floorSpace = floorSpace;
        this.priceForTotalArea = priceForTotalArea;
        this.commercializationType = commercializationType;
    }

    id: number;
    address: string;
    city: City;
    pictureUrl: URL;
    features: Array<Feature>;
    title: string;
    relator: RealTor;
    priceForTotalArea: string;
    productType: ProductCategory;
    floorSpace: string;
    commercializationType: string;
}
