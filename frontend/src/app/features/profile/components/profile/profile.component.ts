import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { OrderService, OrderDetailResponse } from '../../../cart/services/order.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Profile Information</h5>
              <div *ngIf="!user" class="alert alert-warning">
                Please log in to view your profile.
                <button class="btn btn-primary btn-sm ms-2" (click)="goToLogin()">Login</button>
              </div>
              <div *ngIf="user">
                <div class="mb-3">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" [value]="user.firstName" readonly>
                </div>
                <div class="mb-3">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" [value]="user.lastName" readonly>
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" [value]="user.email" readonly>
                </div>
                <div class="mb-3">
                  <label class="form-label">User ID</label>
                  <input type="text" class="form-control" [value]="user.id" readonly>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order History</h5>
              <div *ngIf="!user" class="alert alert-warning">
                Please log in to view your order history.
              </div>
              <div *ngIf="loading" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div *ngIf="error" class="alert alert-danger">
                {{error}}
              </div>
              <div *ngIf="user && !loading && !error && orders.length === 0" class="alert alert-info">
                You don't have any orders yet.
              </div>
              <div *ngIf="user && !loading && !error && orders.length > 0" class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let order of orders">
                      <td>{{order.id}}</td>
                      <td>{{order.createdAt | date}}</td>
                      <td>{{order.totalAmount | currency}}</td>
                      <td>{{order.status}}</td>
                      <td>{{order.paymentStatus}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #c5a47e;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-title {
      color: #1a1a1a;
      border-bottom: 2px solid #c5a47e;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .form-control:read-only {
      background-color: #f8f8f8;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  orders: OrderDetailResponse[] = [];
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // Load user profile
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.currentUser$.subscribe(user => {
        this.user = user;
        console.log('Profile loaded:', this.user);
        
        // Load orders if user is authenticated
        if (this.user) {
          this.loadOrders();
        }
      });
    } else {
      console.log('User not authenticated');
      this.toastService.warning('Please log in to view your profile');
    }
  }
  
  loadOrders(): void {
    this.loading = true;
    this.error = '';
    
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        console.log('Orders loaded:', orders);
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.error = 'Failed to load orders. Please try again.';
        this.loading = false;
        this.toastService.error('Failed to load orders. Please try again.');
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
} 