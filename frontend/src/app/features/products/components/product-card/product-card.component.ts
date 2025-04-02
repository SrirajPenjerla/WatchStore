import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card product-card h-100">
      <img
        [src]="product.imageUrl"
        [alt]="product.name"
        class="card-img-top product-image"
      >
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text text-muted">{{ product.brand }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="h5 mb-0">{{ product.price | currency }}</span>
          <span class="text-muted">
            Stock: {{ product.stockQuantity }}
          </span>
        </div>
        <div class="d-grid gap-2 mt-3">
          <button
            class="btn btn-primary"
            (click)="viewDetails()"
          >
            View Details
          </button>
          <button
            class="btn btn-success"
            (click)="onAddToCart()"
            [disabled]="product.stockQuantity === 0"
          >
            {{ product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      transition: transform 0.2s;
    }
    .product-card:hover {
      transform: translateY(-5px);
    }
    .product-image {
      height: 200px;
      object-fit: cover;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/products', this.product.id]);
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
} 