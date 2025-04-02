import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';

type ProductFormData = Omit<Product, 'id'>;

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="mb-4">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>

      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <form [formGroup] = "productForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Product Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    formControlName="name"
                    [class.is-invalid]="name?.invalid && name?.touched"
                  >
                  <div class="invalid-feedback">
                    Product name is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="brand" class="form-label">Brand</label>
                  <input
                    type="text"
                    class="form-control"
                    id="brand"
                    formControlName="brand"
                    [class.is-invalid]="brand?.invalid && brand?.touched"
                  >
                  <div class="invalid-feedback">
                    Brand is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    formControlName="description"
                    rows="3"
                    [class.is-invalid]="description?.invalid && description?.touched"
                  ></textarea>
                  <div class="invalid-feedback">
                    Description is required
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="price" class="form-label">Price</label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        formControlName="price"
                        min="0"
                        step="0.01"
                        [class.is-invalid]="price?.invalid && price?.touched"
                      >
                    </div>
                    <div class="invalid-feedback">
                      Please enter a valid price
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input
                      type="number"
                      class="form-control"
                      id="stock"
                      formControlName="stock"
                      min="0"
                      [class.is-invalid]="stock?.invalid && stock?.touched"
                    >
                    <div class="invalid-feedback">
                      Please enter a valid stock quantity
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="imageUrl" class="form-label">Image URL</label>
                  <input
                    type="url"
                    class="form-control"
                    id="imageUrl"
                    formControlName="imageUrl"
                    [class.is-invalid]="imageUrl?.invalid && imageUrl?.touched"
                  >
                  <div class="invalid-feedback">
                    Please enter a valid image URL
                  </div>
                </div>

                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <select
                    class="form-select"
                    id="category"
                    formControlName="category"
                    [class.is-invalid]="category?.invalid && category?.touched"
                  >
                    <option value="">Select a category</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sport">Sport</option>
                    <option value="Classic">Classic</option>
                    <option value="Smart">Smart</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a category
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    routerLink="/admin/products"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="productForm.invalid || isLoading"
                  >
                    <span
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      *ngIf="isLoading"
                    ></span>
                    {{ isEditMode ? 'Update Product' : 'Add Product' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Product Preview</h5>
              <div class="text-center mb-3">
                <img
                  [src]="productForm.get('imageUrl')?.value || 'assets/placeholder.png'"
                  [alt]="productForm.get('name')?.value"
                  class="img-fluid rounded"
                  style="max-height: 200px; object-fit: contain;"
                >
              </div>
              <h6 class="mb-1">{{ productForm.get('name')?.value || 'Product Name' }}</h6>
              <p class="text-muted mb-1">{{ productForm.get('brand')?.value || 'Brand' }}</p>
              <p class="mb-1">{{ (productForm.get('price')?.value || 0) | currency }}</p>   
              <p class="mb-0">Stock: {{ productForm.get('stock')?.value || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row" *ngIf="error">
        <div class="col-12">
          <div class="alert alert-danger">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminProductFormComponent implements OnInit {
  public productForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      category: ['', Validators.required],
      isTrending: [false]
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.loadProduct(Number(productId));
    }
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading product.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const productData: ProductFormData = this.productForm.value;
    const request = this.isEditMode
      ? this.productService.updateProduct(Number(this.route.snapshot.paramMap.get('id')), productData)
      : this.productService.createProduct(productData as Omit<Product, "id">);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        this.error = `Error ${this.isEditMode ? 'updating' : 'creating'} product.`;
        this.isLoading = false;
      }
    });
  }

  // Form getters
  get name() { return this.productForm.get('name'); }
  get brand() { return this.productForm.get('brand'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get stock() { return this.productForm.get('stock'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }
  get category() { return this.productForm.get('category'); }
} 