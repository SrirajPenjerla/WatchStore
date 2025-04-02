import { Product } from '../../products/models/product.model';

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
} 