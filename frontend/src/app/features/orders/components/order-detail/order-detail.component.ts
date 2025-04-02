import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService, Order } from '../../../../services/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Details</h2>
        <button class="btn btn-outline-secondary" routerLink="/orders">
          Back to Orders
        </button>
      </div>

      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && order" class="card">
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-md-6">
              <h5 class="card-title">Order Information</h5>
              <p class="mb-1"><strong>Order ID:</strong> #{{ order.id }}</p>
              <p class="mb-1"><strong>Date:</strong> {{ order.createdAt | date }}</p>
              <p class="mb-1"><strong>Status:</strong> 
                <span [class]="'badge ' + getStatusBadgeClass(order.status)">
                  {{ order.status }}
                </span>
              </p>
            </div>
            <div class="col-md-6">
              <h5 class="card-title">Shipping Address</h5>
              <p class="mb-1">{{ order.shippingAddress.street }}</p>
              <p class="mb-1">{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zipCode }}</p>
              <p class="mb-1">{{ order.shippingAddress.country }}</p>
            </div>
          </div>

          <h5 class="card-title mb-3">Order Items</h5>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of order.items">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        [src]="item.productImageUrl"
                        [alt]="item.productName"
                        class="img-thumbnail me-3"
                        style="width: 60px; height: 60px; object-fit: cover;"
                      >
                      <div>
                        <h6 class="mb-0">{{ item.productName }}</h6>
                        <small class="text-muted">{{ item.productBrand }}</small>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.price | currency }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ (item.price * item.quantity) | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-end"><strong>Total:</strong></td>
                  <td>{{ order.total | currency }}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.9em;
      padding: 0.5em 0.8em;
    }
    .badge-pending { background-color: #ffc107; }
    .badge-processing { background-color: #17a2b8; }
    .badge-shipped { background-color: #28a745; }
    .badge-delivered { background-color: #6c757d; }
    .badge-cancelled { background-color: #dc3545; }
  
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrder(Number(orderId));
    }
  }

  loadOrder(id: number): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrder(id).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load order details. Please try again later.';
        this.loading = false;
      }
    });
  }

  getStatusBadgeClass(status: Order['status']): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'badge-pending';
      case 'processing': return 'badge-processing';
      case 'shipped': return 'badge-shipped';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-secondary';
    }
  }
} 