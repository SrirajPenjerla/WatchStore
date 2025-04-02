import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>Royal Watches</h5>
            <p >Luxury timepieces for the distinguished collector.</p>
          </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/products">Products</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Contact Us</h5>
            <ul class="list-unstyled">
              <li>Email: info&#64;royalwatches.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: 123 ,AP</li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <p class="mb-0">&copy; 2024 Royal Watches. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #1a1a1a;
      color: #ffffff;
      border-top: 1px solid #c5a47e;
    }
    h5 {
      color: #c5a47e;
      margin-bottom: 1rem;
    }
    a {
      color: #ffffff;
      text-decoration: none;
    }
    a:hover {
      color: #c5a47e;
    }
    hr {
      border-color: #c5a47e;
    }
    .text-muted {
      color:rgb(255, 255, 255);
    }
  `]
})
export class FooterComponent {} 