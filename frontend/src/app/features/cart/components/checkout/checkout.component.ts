import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem, Cart } from '../../../../services/cart.service';
import { OrderService, Order } from '../../../../services/order.service';
import { PaymentService } from '../../../../services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="checkout-container">
      <h1>Checkout</h1>

      <div class="checkout-content">
        <div class="order-summary">
          <h2>Order Summary</h2>
          <div *ngFor="let item of cartItems" class="cart-item">
            <img [src]="item.product.imageUrl" [alt]="item.product.name">
            <div class="item-details">
              <h3>{{ item.product.name }}</h3>
              <p class="brand">{{ item.product.brand }}</p>
              <p class="quantity">Quantity: {{ item.quantity }}</p>
              <p class="price">{{ item.product.price * item.quantity | currency }}</p>
            </div>
          </div>
          <div class="total">
            <h3>Total: {{ calculateTotal() | currency }}</h3>
          </div>
        </div>

        <div class="checkout-form">
          <h2>Shipping Information</h2>
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                [class.invalid]="checkoutForm.get('name')?.invalid && checkoutForm.get('name')?.touched"
              >
              <div class="error-message" *ngIf="checkoutForm.get('name')?.invalid && checkoutForm.get('name')?.touched">
                Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                [class.invalid]="checkoutForm.get('email')?.invalid && checkoutForm.get('email')?.touched"
              >
              <div class="error-message" *ngIf="checkoutForm.get('email')?.invalid && checkoutForm.get('email')?.touched">
                Valid email is required
              </div>
            </div>

            <div class="form-group">
              <label for="address">Address</label>
              <input 
                type="text" 
                id="address" 
                formControlName="address"
                [class.invalid]="checkoutForm.get('address')?.invalid && checkoutForm.get('address')?.touched"
              >
              <div class="error-message" *ngIf="checkoutForm.get('address')?.invalid && checkoutForm.get('address')?.touched">
                Address is required
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input 
                  type="text" 
                  id="city" 
                  formControlName="city"
                  [class.invalid]="checkoutForm.get('city')?.invalid && checkoutForm.get('city')?.touched"
                >
                <div class="error-message" *ngIf="checkoutForm.get('city')?.invalid && checkoutForm.get('city')?.touched">
                  City is required
                </div>
              </div>

              <div class="form-group">
                <label for="state">State</label>
                <input 
                  type="text" 
                  id="state" 
                  formControlName="state"
                  [class.invalid]="checkoutForm.get('state')?.invalid && checkoutForm.get('state')?.touched"
                >
                <div class="error-message" *ngIf="checkoutForm.get('state')?.invalid && checkoutForm.get('state')?.touched">
                  State is required
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="zipCode">ZIP Code</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  formControlName="zipCode"
                  [class.invalid]="checkoutForm.get('zipCode')?.invalid && checkoutForm.get('zipCode')?.touched"
                >
                <div class="error-message" *ngIf="checkoutForm.get('zipCode')?.invalid && checkoutForm.get('zipCode')?.touched">
                  ZIP code is required
                </div>
              </div>

              <div class="form-group">
                <label for="country">Country</label>
                <input 
                  type="text" 
                  id="country" 
                  formControlName="country"
                  [class.invalid]="checkoutForm.get('country')?.invalid && checkoutForm.get('country')?.touched"
                >
                <div class="error-message" *ngIf="checkoutForm.get('country')?.invalid && checkoutForm.get('country')?.touched">
                  Country is required
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                formControlName="cardNumber"
                [class.invalid]="checkoutForm.get('cardNumber')?.invalid && checkoutForm.get('cardNumber')?.touched"
              >
              <div class="error-message" *ngIf="checkoutForm.get('cardNumber')?.invalid && checkoutForm.get('cardNumber')?.touched">
                Valid card number is required
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="expiry">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiry" 
                  formControlName="expiry"
                  placeholder="MM/YY"
                  [class.invalid]="checkoutForm.get('expiry')?.invalid && checkoutForm.get('expiry')?.touched"
                >
                <div class="error-message" *ngIf="checkoutForm.get('expiry')?.invalid && checkoutForm.get('expiry')?.touched">
                  Valid expiry date is required
                </div>
              </div>

              <div class="form-group">
                <label for="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  formControlName="cvv"
                  [class.invalid]="checkoutForm.get('cvv')?.invalid && checkoutForm.get('cvv')?.touched"
                >
                <div class="error-message" *ngIf="checkoutForm.get('cvv')?.invalid && checkoutForm.get('cvv')?.touched">
                  Valid CVV is required
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              class="submit-button"
              [disabled]="checkoutForm.invalid || processing"
            >
              {{ processing ? 'Processing...' : 'Place Order' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 40px;
      color: #2c3e50;
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 40px;
    }

    .order-summary {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      height: fit-content;
    }

    .cart-item {
      display: flex;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid #dee2e6;
    }

    .cart-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      flex: 1;
    }

    .item-details h3 {
      margin: 0 0 5px 0;
      font-size: 1.1em;
    }

    .brand {
      color: #666;
      margin: 0 0 5px 0;
    }

    .quantity {
      margin: 0 0 5px 0;
    }

    .price {
      font-weight: bold;
      color: #2c3e50;
      margin: 0;
    }

    .total {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #dee2e6;
    }

    .total h3 {
      margin: 0;
      font-size: 1.3em;
      color: #2c3e50;
    }

    .checkout-form {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #495057;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1em;
    }

    input.invalid {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875em;
      margin-top: 5px;
    }

    .submit-button {
      width: 100%;
      padding: 15px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1.1em;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .submit-button:hover {
      background-color: #2980b9;
    }

    .submit-button:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  processing = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe({
      next: (cart: Cart) => {
        this.cartItems = cart.cartItems;
      },
      error: (error: Error) => {
        console.error('Failed to load cart items:', error);
      }
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.processing = true;

    const orderData = {
      items: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      shippingAddress: {
        street: this.checkoutForm.get('address')?.value,
        city: this.checkoutForm.get('city')?.value,
        state: this.checkoutForm.get('state')?.value,
        zipCode: this.checkoutForm.get('zipCode')?.value,
        country: this.checkoutForm.get('country')?.value
      },
      paymentMethod: 'card'
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (order: Order) => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.router.navigate(['/order-confirmation', order.id]);
          },
          error: (error: Error) => {
            console.error('Failed to clear cart:', error);
            this.processing = false;
          }
        });
      },
      error: (error: Error) => {
        console.error('Failed to create order:', error);
        this.processing = false;
      }
    });
  }
} 