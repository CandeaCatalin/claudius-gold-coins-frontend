import { AdminService } from './admin.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { SessionStorageService } from './session-storage.service';
import { CartItemModel } from '../shared/models/CartModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public items: CartItemModel[] = [];
  public cartId: string = '';
  constructor(
    private httpRequestsService: HttpRequestsService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}
  async createCart() {
    this.httpRequestsService.post('cart/create', {}).subscribe({
      next: (r) => this.localStorageService.set('guestToken', r.guestToken),
    });
  }

  addProductToCart(product: any) {
    var body = {
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      priceAtAdd: product.totalPrice,
    };

    var token = this.localStorageService.get<string>('guestToken');
    var userToken = this.sessionStorageService.getItem('token');
    if (token === null && userToken === null) {
      this.httpRequestsService.post('cart/create', {}).subscribe({
        next: (r) => {
          this.localStorageService.set('guestToken', r.guestToken);
          this.httpRequestsService
            .postForCarts('cart/add-item', body, false, r.guestToken)
            .subscribe({
              next: (r) => {
                this.items = r.items;
                this.cartId = r.id;
              },
              error: (error) => console.log(error),
            });
        },
      });
    } else {
      if (userToken === null) {
        this.httpRequestsService
          .postForCarts('cart/add-item', body, false, token as string)
          .subscribe({
            next: (r) => {
              this.items = r.items;
              this.cartId = r.id;
            },
            error: (error) => console.log(error),
          });
      } else {
        this.httpRequestsService
          .postForCarts('cart/add-item/loggedIn', body, true, '')
          .subscribe({
            next: (r) => {
              this.items = r.items;
              this.cartId = r.id;
            },
            error: (error) => console.log(error),
          });
      }
    }
  }

  getCart() {
    var token = this.localStorageService.get<string>('guestToken');
    if (this.sessionStorageService.isLoggedIn) {
      return this.httpRequestsService
        .getForCarts('cart/loggedIn', true, token as string)
        .subscribe({
          next: (r: any) => {
            this.items = r.items;
            this.cartId = r.id;
          },
          error: (error) => console.log(error),
        });
    }
    return this.httpRequestsService
      .getForCarts('cart', false, token as string)
      .subscribe({
        next: (r: any) => {
          this.items = r.items;
          this.cartId = r.id;
        },
        error: (error) => console.log(error),
      });
  }

  mergeCarts() {
    var token = this.localStorageService.get<string>('guestToken');
    return this.httpRequestsService
      .postForCarts('cart/merge', {}, true, token as string)
      .subscribe({
        next: (r) => this.localStorageService.remove('guestToken'),
      });
  }

  checkout() {
    return this.httpRequestsService.post('cart/checkout', {}, true);
  }
}
