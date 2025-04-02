import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1050">
      <div *ngFor="let toast of toasts" 
           class="toast" 
           role="alert" 
           aria-live="assertive" 
           aria-atomic="true"
           [ngClass]="'bg-' + getBootstrapClass(toast.type)">
        <div class="toast-header">
          <strong class="me-auto">{{getTitle(toast.type)}}</strong>
          <button type="button" class="btn-close" (click)="removeToast(toast)"></button>
        </div>
        <div class="toast-body">
          {{toast.message}}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      min-width: 300px;
    }
    .toast {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
    .bg-success {
      background-color: #d4edda !important;
      color: #155724;
    }
    .bg-error {
      background-color: #f8d7da !important;
      color: #721c24;
    }
    .bg-warning {
      background-color: #fff3cd !important;
      color: #856404;
    }
    .bg-info {
      background-color: #d1ecf1 !important;
      color: #0c5460;
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.removeToast(toast);
      }, toast.duration || 3000);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeToast(toast: Toast): void {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }

  getBootstrapClass(type: string): string {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }

  getTitle(type: string): string {
    switch (type) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Info';
      default: return 'Info';
    }
  }
} 