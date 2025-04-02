import { CartItem } from './cart-item.model';

export interface Cart {
  id: number;
  userId: string;
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
} 