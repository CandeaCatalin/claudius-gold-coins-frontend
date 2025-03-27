export interface ProductModel{
    id:string;
    name:string;
    price: number;
    priceModifier:number;
    content:string;
    category: string;
    mainImage: string;
    images?:string[];
}
