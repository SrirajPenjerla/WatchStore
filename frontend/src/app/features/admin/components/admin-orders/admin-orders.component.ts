import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="mb-4">Order Management</h2>

      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of orders">
                  <td>#{{ order.id }}</td>
                  <td>{{ order.createdAt | date }}</td>
                  <td>{{ order.userId }}</td>
                  <td>{{ order.total | currency }}</td>
                  <td>
                    <span [class]="'badge ' + getStatusBadgeClass(order.status)">
                      {{ order.status }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button 
                        class="btn btn-sm btn-outline-primary"
                        [routerLink]="['/admin/orders',order.id]"
                      >
                        View
                      </button>
                      <button 
                        *ngIf="order.status === 'pending'"
                        class="btn btn-sm btn-outline-success"
                        (click)="updateOrderStatus(order.id, 'processing')"
                      >
                        Process
                      </button>
                      <button 
                        *ngIf="order.status === 'processing'"
                        class="btn btn-sm btn-outline-info"
                        (click)="updateOrderStatus(order.id, 'shipped')"
                      >
                        Ship
                      </button>
                      <button 
                        *ngIf="order.status === 'pending' || order.status === 'processing'"
                        class="btn btn-sm btn-outline-danger"
                        (click)="cancelOrder(order.id)"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
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
    .btn-group {
      gap: 0.25rem;
    }
  `]
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
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

  updateOrderStatus(orderId: number, status: Order['status']): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        this.error = 'Failed to update order status. Please try again later.';
      }
    });
  }

  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (error) => {
          this.error = 'Failed to cancel order. Please try again later.';
        }
      });
    }
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