import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilters } from '../../../../services/product.service';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Filters</h5>
      </div>
      <div class="card-body">
        <form (ngSubmit)="applyFilters()">
          <div class="mb-3">
            <label for="search" class="form-label">Search</label>
            <input
              type="text"
              class="form-control"
              id="search"
              [(ngModel)]="localFilters.search"
              name="search"
            >
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select
              class="form-select"
              id="category"
              [(ngModel)]="localFilters.category"
              name="category"
            >
              <option value="">All Categories</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="quartz">Quartz</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="brand" class="form-label">Brand</label>
            <select
              class="form-select"
              id="brand"
              [(ngModel)]="localFilters.brand"
              name="brand"
            >
              <option value="">All Brands</option>
              <option value="rolex">Rolex</option>
              <option value="omega">Omega</option>
              <option value="tag-heuer">Tag Heuer</option>
              <option value="seiko">Seiko</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Price Range</label>
            <div class="row">
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Min"
                  [(ngModel)]="localFilters.minPrice"
                  name="minPrice"
                >
              </div>
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Max"
                  [(ngModel)]="localFilters.maxPrice"
                  name="maxPrice"
                >
              </div>
            </div>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProductFiltersComponent implements OnInit {
  @Input() filters!: ProductFilters;
  @Output() filtersChange = new EventEmitter<ProductFilters>();

  localFilters: ProductFilters = {
    search: '',
    category: '',
    brand: '',
    minPrice: undefined,
    maxPrice: undefined
  };

  ngOnInit(): void {
    this.localFilters = { ...this.filters };
  }

  applyFilters(): void {
    this.filtersChange.emit(this.localFilters);
  }
} 