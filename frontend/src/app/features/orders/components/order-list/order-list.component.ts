import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>My Orders</h2>
      
      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && orders.length === 0" class="text-center">
        <p>You haven't placed any orders yet.</p>
        <a routerLink="/products" class="btn btn-primary">Browse Products</a>
      </div>

      <div *ngIf="!loading && !error && orders.length > 0" class="row">
        <div *ngFor="let order of orders" class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order #{{ order.id }}</h5>
              <p class="card-text">
                <strong>Date:</strong> {{ order.createdAt | date }}<br>
                <strong>Status:</strong> 
                <span [class]="'badge ' + getStatusBadgeClass(order.status)">
                  {{ order.status }}
                </span><br>
                <strong>Total:</strong> {{ order.total | currency }}
              </p>
              <a [routerLink]="['/orders', order.id]" class="btn btn-primary">View Details</a>
            </div>
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
    .container{
      padding-top: 50px;
    }
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = null;
    
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load orders. Please try again later.';
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