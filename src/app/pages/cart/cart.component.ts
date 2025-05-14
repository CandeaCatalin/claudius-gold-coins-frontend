import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderModel } from '../../shared/models/OrderModel';
import { ProductModel } from '../../shared/models/ProductModel';
import { UserModel } from '../../shared/models/UserModel';
import { HttpRequestsService } from '../../services/http-requests.service';
import { CartService } from '../../services/cart.service';
import { CartItemModel } from '../../shared/models/CartModel';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const ORDERS: OrderModel[] = [];

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  deliveryForm: FormGroup;
  title: string = 'Coșul meu';
  allOrders: OrderModel[] = ORDERS;
  items: CartItemModel[] = [];
  searchQuery: string = '';
  initialItems: CartItemModel[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private httpService: HttpRequestsService,
    public cartService: CartService
  ) {
    this.deliveryForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4,10}$')],
      ],
    });
  }

  ngOnInit(): void {
    this.cartService.getCart();
    this.loadItems();
  }

  private loadItems(): void {
    this.items = this.cartService.items;
    this.initialItems = this.cartService.items;
  }

  applyFilter(event: Event): void {
    this.items = this.initialItems.filter((x) =>
      x.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.searchQuery = '';

    this.cdr.detectChanges();
  }

  public deleteProductFromCart(productId: string) {
    this.httpService
      .delete(
        `cart/removeItemFromCart/${productId}/${this.cartService.cartId}`,
        true
      )
      .subscribe({
        next: (r) => r,
      });
    this.cartService.items = this.cartService.items.filter(
      (i) => i.id != productId
    );
    this.items = this.cartService.items;
  }

  sortData(column: keyof CartItemModel): void {
    this.items = this.sortItems(column);
  }

  private sortItems(column: keyof CartItemModel): CartItemModel[] {
    return [...this.items].sort((a, b) => {
      const aValue = this.getSortValue(a, column);
      const bValue = this.getSortValue(b, column);

      return aValue
        .toString()
        .localeCompare(bValue.toString(), undefined, { numeric: true });
    });
  }

  private getSortValue(
    item: CartItemModel,
    column: keyof CartItemModel
  ): string | number | boolean | UserModel | ProductModel | string[] {
    return item[column as keyof CartItemModel] ?? '';
  }

  onSubmit(): void {
    this.httpService.post('cart/Submit', this.allOrders).subscribe({
      next: (response: unknown) => {
        console.log('Orders submitted successfully');
        // TODO: Add success notification
      },
      error: (error: Error) => {
        console.error('Error submitting orders:', error);
        // TODO: Add error notification
      },
    });
  }
}
