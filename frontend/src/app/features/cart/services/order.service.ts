import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
}

export interface OrderResponse {
  id: string;
  orderDate: Date;
  total: number;
  status: string;
}

// Updated interfaces to match the backend structure
export interface OrderItemResponse {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    brand: string;
    category: string;
  };
}

export interface OrderDetailResponse {
  id: number;
  userId: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItemResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, order);
  }
  
  getUserOrders(): Observable<OrderDetailResponse[]> {
    return this.http.get<OrderDetailResponse[]>(this.apiUrl);
  }
} 