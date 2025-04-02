import { Component, Input } from '@angular/core';
import { OrderItem } from '../../../../services/order.service';

@Component({
  selector: 'app-order-item',
  template: `
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
  `
})
export class OrderItemComponent {
  @Input() item!: OrderItem;
} 