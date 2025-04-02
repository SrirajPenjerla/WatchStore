import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { OrderService, OrderResponse } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container py-5">
      <h2 class="mb-4">Shopping Cart</h2>
      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div *ngIf="error" class="alert alert-danger">
        {{error}}
      </div>
      <div *ngIf="!loading && !error">
        <div *ngIf="!cartItems || cartItems.length === 0" class="alert alert-info">
          Your cart is empty. <a routerLink="/products">Continue shopping</a>
        </div>
        <div *ngIf="cartItems && cartItems.length > 0">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of cartItems">
                  <td>
                    <div class="d-flex align-items-center">
                      <img *ngIf="item.product && item.product.imageUrl" [src]="item.product.imageUrl" [alt]="item.product.name" class="img-thumbnail me-3" style="width: 50px; height: 50px; object-fit: cover;">
                      <div>
                        <h6 class="mb-0">{{item.product ? item.product.name : item.name}}</h6>
                        <small class="text-muted">{{item.product ? item.product.description : ''}}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="input-group" style="width: 120px;">
                      <button class="btn btn-outline-secondary" type="button" (click)="updateQuantity(item, item.quantity - 1)" [disabled]="item.quantity <= 1">-</button>
                      <input type="number" class="form-control text-center" [value]="item.quantity" (change)="onQuantityChange($event, item)">
                      <button class="btn btn-outline-secondary" type="button" (click)="updateQuantity(item, item.quantity + 1)">+</button>
                    </div>
                  </td>
                  <td>{{item.product ? item.product.price : item.price | currency}}</td>
                  <td>{{(item.product ? item.product.price : item.price) * item.quantity | currency}}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" (click)="removeItem(item)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-end"><strong>Total:</strong></td>
                  <td><strong>{{calculateTotal() | currency}}</strong></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-outline-primary" routerLink="/products">
              Continue Shopping
            </button>
            <button class="btn btn-primary" (click)="checkout()">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table th {
      background-color: #f8f9fa;
    }
    .input-group {
      width: 120px;
    }
    .input-group input {
      text-align: center;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;
  error = '';

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Please log in to view your cart');
      this.router.navigate(['/auth/login']);
      return;
    }
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = '';
    this.cartService.getCart().subscribe({
      next: (items) => {
        console.log('Cart items loaded:', items);
        if (items && Array.isArray(items)) {
          // Log the structure of each item
          items.forEach((item, index) => {
            console.log(`Cart item ${index}:`, item);
            console.log(`Cart item ${index} properties:`, Object.keys(item));
          });
          
          this.cartItems = items;
          console.log('Cart items set:', this.cartItems);
        } else {
          console.warn('Cart items is not an array:', items);
          this.cartItems = [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.error = 'Failed to load cart items. Please try again.';
        this.loading = false;
        this.toastService.error('Failed to load cart items. Please try again.');
      }
    });
  }

  onQuantityChange(event: Event, item: CartItem): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      this.updateQuantity(item, quantity);
    }
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) return;
    
    console.log('Updating quantity for item:', item);
    console.log('Item ID:', item.id);
    console.log('New quantity:', newQuantity);
    
    // Use the cart item ID instead of the product ID
    this.cartService.updateQuantity(item.id.toString(), newQuantity).subscribe({
      next: (response) => {
        console.log('Update quantity response:', response);
        this.loadCart();
        this.toastService.success('Cart updated successfully');
      },
      error: (error) => {
        console.error('Error updating quantity:', error);
        this.toastService.error('Failed to update quantity');
      }
    });
  }

  removeItem(item: CartItem): void {
    console.log('Removing item:', item);
    console.log('Item ID:', item.id);
    
    // Use the cart item ID instead of the product ID
    this.cartService.removeItem(item.id.toString()).subscribe({
      next: (response) => {
        console.log('Remove item response:', response);
        this.loadCart();
        this.toastService.success('Item removed from cart');
      },
      error: (error) => {
        console.error('Error removing item:', error);
        this.toastService.error('Failed to remove item');
      }
    });
  }

  calculateTotal(): number {
    if (!this.cartItems) return 0;
    return this.cartItems.reduce((total, item) => {
      const price = item.product ? item.product.price || 0 : item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }

  checkout(): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Please log in to proceed with checkout');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (!this.cartItems || this.cartItems.length === 0) {
      this.toastService.warning('Your cart is empty');
      return;
    }

    // Navigate to the checkout page
    this.router.navigate(['/checkout']);
  }
} 