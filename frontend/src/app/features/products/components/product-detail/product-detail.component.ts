import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';
import { CartService } from '../../../../features/cart/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && product" class="row">
        <div class="col-md-6">
          <img [src]="product.imageUrl" [alt]="product.name" class="img-fluid rounded">
        </div>
        <div class="col-md-6">
          <h2>{{ product.name }}</h2>
          <p class="text-muted">{{ product.brand }}</p>
          <p class="lead">{{ product.description }}</p>
          <div class="mb-4">
            <h3 class="text-primary">{{ product.price | currency }}</h3>
            <p class="text-muted">
              {{ product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }}
              ({{ product.stockQuantity }} available)
            </p>
          </div>
          <div class="mb-4">
            <div class="input-group" style="width: 150px;">
              <button
                class="btn btn-outline-secondary"
                type="button"
                (click)="updateQuantity(quantity - 1)"
                [disabled]="quantity <= 1"
              >
                -
              </button>
              <input
                type="number"
                class="form-control text-center"
                [(ngModel)]="quantity"
                min="1"
                [max]="product.stockQuantity"
                (change)="validateQuantity()"
              >
              <button
                class="btn btn-outline-secondary"
                type="button"
                (click)="updateQuantity(quantity + 1)"
                [disabled]="quantity >= product.stockQuantity"
              >
                +
              </button>
            </div>
          </div>
          <button
            class="btn btn-primary btn-lg w-100"
            (click)="addToCart()"
            [disabled]="product.stockQuantity === 0"
          >
            {{ product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .input-group input {
      border-left: none;
      border-right: none;
    }
    .input-group .btn {
      border-color: #ced4da;
    }
    .input-group .btn:hover {
      background-color: #f8f9fa;
    }
    .img-fluid {
      max-height: 500px;
      object-fit: contain;
    }
    .container{
      padding-top: 100px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(productId);
  }

  loadProduct(id: number) {
    this.loading = true;
    this.error = null;
    
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load product details. Please try again later.';
        this.loading = false;
        this.toastService.error('Failed to load product details. Please try again later.');
      }
    });
  }

  updateQuantity(newQuantity: number) {
    if (this.product) {
      this.quantity = Math.max(1, Math.min(newQuantity, this.product.stockQuantity));
    }
  }

  validateQuantity() {
    if (this.product) {
      this.quantity = Math.max(1, Math.min(this.quantity, this.product.stockQuantity));
    }
  }

  addToCart(): void {
    if (!this.product) {
      this.toastService.error('Product not found');
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Please log in to add items to cart');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.cartService.addToCart(this.product.id.toString(), this.quantity).subscribe({
      next: () => {
        this.toastService.success('Item added to cart');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.toastService.error('Failed to add item to cart');
      }
    });
  }
} 