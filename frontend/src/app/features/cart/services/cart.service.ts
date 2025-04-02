import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface CartItem {
  id: number;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  cartId: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  } | null;
}

export interface Cart {
  id: number;
  userId: string;
  user: any;
  cartItems: CartItem[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  getCart(): Observable<CartItem[]> {
    console.log('Fetching cart from:', this.apiUrl);
    return this.http.get<Cart>(this.apiUrl).pipe(
      tap(response => console.log('Cart response:', response)),
      map(response => {
        if (response && response.cartItems) {
          return response.cartItems;
        }
        return [];
      }),
      catchError(this.handleError)
    );
  }

  addToCart(productId: string, quantity: number): Observable<CartItem> {
    console.log('Adding to cart:', { productId, quantity });
    return this.http.post<CartItem>(`${this.apiUrl}/items`, { productId, quantity }).pipe(
      tap(response => console.log('Add to cart response:', response)),
      catchError(this.handleError)
    );
  }

  updateQuantity(productId: string, quantity: number): Observable<CartItem> {
    console.log('Updating quantity:', { productId, quantity });
    console.log('API URL:', `${this.apiUrl}/items/${productId}`);
    
    // Try using the cart item ID instead of product ID if the API expects that
    return this.http.put<CartItem>(`${this.apiUrl}/items/${productId}`, { quantity }).pipe(
      tap(response => console.log('Update quantity response:', response)),
      catchError(error => {
        console.error('Error updating quantity:', error);
        // If we get a 405 error, try an alternative endpoint
        if (error.status === 405) {
          console.log('Trying alternative endpoint for update quantity');
          return this.http.put<CartItem>(`${this.apiUrl}/update`, { productId, quantity }).pipe(
            tap(response => console.log('Alternative update quantity response:', response)),
            catchError(this.handleError)
          );
        }
        return this.handleError(error);
      })
    );
  }

  removeItem(productId: string): Observable<void> {
    console.log('Removing item:', productId);
    console.log('API URL:', `${this.apiUrl}/items/${productId}`);
    
    // Try using the cart item ID instead of product ID if the API expects that
    return this.http.delete<void>(`${this.apiUrl}/items/${productId}`).pipe(
      tap(() => console.log('Item removed successfully')),
      catchError(error => {
        console.error('Error removing item:', error);
        // If we get a 405 error, try an alternative endpoint
        if (error.status === 405) {
          console.log('Trying alternative endpoint for remove item');
          return this.http.delete<void>(`${this.apiUrl}/remove`, { body: { productId } }).pipe(
            tap(() => console.log('Alternative remove item response: success')),
            catchError(this.handleError)
          );
        }
        return this.handleError(error);
      })
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl).pipe(
      tap(() => console.log('Cart cleared successfully')),
      catchError(this.handleError)
    );
  }

  private calculateTotal(items: CartItem[]): number {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 0);
    }, 0);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Cart service error:', error);
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 401) {
        errorMessage = 'You are not authenticated. Please log in.';
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to perform this action.';
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.status === 405) {
        errorMessage = 'The requested method is not allowed. Please try again.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }
    
    return throwError(() => errorMessage);
  }
} 