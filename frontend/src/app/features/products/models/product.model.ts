export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  brand: string;
  category: string;
  imageUrl: string;
  isTrending: boolean;
  createdAt: Date;
  updatedAt: Date;
} 