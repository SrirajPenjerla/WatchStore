import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product, ProductFilters, ProductSort } from '../../../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthService } from '../../../../services/auth.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  template: `
    <div class="product-list">
      <div class="filters">
        <select [(ngModel)]="selectedCategory" (change)="applyFilters()">
          <option value="">All Categories</option>
          <option *ngFor="let category of categories" [value]="category">
            {{ category }}
          </option>
        </select>

        <select [(ngModel)]="selectedBrand" (change)="applyFilters()">
          <option value="">All Brands</option>
          <option *ngFor="let brand of brands" [value]="brand">
            {{ brand }}
          </option>
        </select>

        <select [(ngModel)]="sortField" (change)="applySort()">
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="brand">Brand</option>
        </select>

        <select [(ngModel)]="sortDirection" (change)="applySort()">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div class="products-grid">
        <app-product-card
          *ngFor="let product of products"
          [product]="product"
          (addToCart)="addToCart($event)"
        ></app-product-card>
      </div>

      <div *ngIf="loading" class="loading">
        Loading products...
      </div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && products.length === 0" class="no-products">
        No products found.
      </div>
    </div>
  `,
  styles: [`
    .product-list {
      padding: 20px;
    }

    .filters {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .filters select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .loading, .error, .no-products {
      text-align: center;
      padding: 20px;
      font-size: 1.2em;
    }

    .error {
      color: #e74c3c;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;
  categories: string[] = [];
  brands: string[] = [];
  selectedCategory = '';
  selectedBrand = '';
  sortField: ProductSort['field'] = 'price';
  sortDirection: ProductSort['direction'] = 'asc';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    const filters: ProductFilters = {
      category: this.selectedCategory || undefined,
      brand: this.selectedBrand || undefined
    };

    const sort: ProductSort = {
      field: this.sortField,
      direction: this.sortDirection
    };

    this.productService.getProducts(filters, sort).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        this.toastService.error('Failed to load products. Please try again later.');
      }
    });
  }

  applyFilters(): void {
    this.loadProducts();
  }

  applySort(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Please log in to add items to cart');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.cartService.addToCart(product.id.toString(), 1).subscribe({
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