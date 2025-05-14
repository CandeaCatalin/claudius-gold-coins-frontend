export interface CartItemModel {
  id: string;
  cart: any;
  productId: string;
  productName: string;
  productCategory: string;
  priceAtAdd: number;
  addedAt: Date;
}
