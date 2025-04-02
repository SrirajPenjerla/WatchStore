import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Royal Watches</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cart" routerLinkActive="active">Cart</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <ng-container *ngIf="!isAuthenticated">
              <li class="nav-item">
                <a class="nav-link" routerLink="/auth/login" routerLinkActive="active">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/auth/register" routerLinkActive="active">Register</a>
              </li>
            </ng-container>
            <ng-container *ngIf="isAuthenticated">
              <li class="nav-item">
                <a class="nav-link" routerLink="/profile" routerLinkActive="active">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/orders" routerLinkActive="active">Orders</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" (click)="logout($event)">Logout</a>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #1a1a1a !important;
      border-bottom: 1px solid #c5a47e;
    }
    .navbar-brand {
      color: #c5a47e !important;
      font-weight: bold;
    }
    .nav-link {
      color: #ffffff !important;
    }
    .nav-link:hover {
      color: #c5a47e !important;
    }
    .nav-link.active {
      color: #c5a47e !important;
      font-weight: bold;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.authStatus$.subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
      }
    );
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
