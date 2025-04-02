import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-md-6">
            <h1 class="display-4 fw-bold">Royal Watches</h1>
            <p class="lead">Discover our collection of luxury timepieces</p>
            <a routerLink="/products" class="btn btn-primary btn-lg">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/hero-bg.jpg');
      background-size: cover;
      background-position: center;
      color: white;
    }
  `]
})
export class HomeComponent {} 