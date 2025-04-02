import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../cart/services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { OrderService, Order, OrderItem } from '../../../cart/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private orderService: OrderService
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Please log in to proceed with checkout');
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
        console.log('Cart items loaded for checkout:', items);
        if (items && Array.isArray(items)) {
          this.cartItems = items;
          if (this.cartItems.length === 0) {
            this.toastService.warning('Your cart is empty');
            this.router.navigate(['/cart']);
          }
        } else {
          console.warn('Cart items is not an array:', items);
          this.cartItems = [];
          this.toastService.warning('Your cart is empty');
          this.router.navigate(['/cart']);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart for checkout:', error);
        this.error = 'Failed to load cart items. Please try again.';
        this.loading = false;
        this.toastService.error('Failed to load cart items. Please try again.');
      }
    });
  }

  calculateTotal(): number {
    if (!this.cartItems) return 0;
    return this.cartItems.reduce((total, item) => {
      const price = item.product ? item.product.price : item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.toastService.error('Please fill in all required fields correctly');
      return;
    }

    if (!this.cartItems || this.cartItems.length === 0) {
      this.toastService.warning('Your cart is empty');
      this.router.navigate(['/cart']);
      return;
    }

    this.loading = true;
    
    // Create order items from cart items
    const orderItems: OrderItem[] = this.cartItems.map(item => {
      const productId = item.product ? item.product.id : item.productId;
      const price = item.product ? item.product.price : item.price;
      
      return {
        productId: productId,
        quantity: item.quantity,
        price: price
      };
    });
    
    // Create the order
    const order: Order = {
      items: orderItems,
      total: this.calculateTotal()
    };
    
    console.log('Creating order:', order);
    
    // Submit the order to the backend
    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        this.loading = false;
        this.toastService.success('Order placed successfully!');
        
        // Clear the cart after successful order
        this.cartService.clearCart().subscribe({
          next: () => {
            console.log('Cart cleared after order');
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            console.error('Error clearing cart after order:', error);
            // Still navigate to profile even if clearing cart fails
            this.router.navigate(['/profile']);
          }
        });
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.loading = false;
        this.toastService.error('Failed to place order. Please try again.');
      }
    });
  }
} 