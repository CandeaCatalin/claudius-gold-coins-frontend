import { ProductModel } from './ProductModel';
import { UserModel } from './UserModel';

export interface OrderModel {
  id: string;
  user: UserModel;
  product: ProductModel;
  status: string;
  finalPrice: number;
  address: string;
}
