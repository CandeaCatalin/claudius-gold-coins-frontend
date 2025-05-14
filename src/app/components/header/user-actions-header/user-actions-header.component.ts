import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigateService } from '../../../services/navigate.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-actions-header',
  imports: [RouterModule],
  templateUrl: './user-actions-header.component.html',
  styleUrl: './user-actions-header.component.scss',
})
export class UserActionsHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private navigateService: NavigateService,
    private sessionsStorageService: SessionStorageService,
    public cartService: CartService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }
  ngOnInit(): void {
    this.subscriptions.push(this.cartService.getCart());
  }

  navigateAndRefresh() {
    if (this.sessionsStorageService.isLoggedIn) {
      this.sessionsStorageService.removeItem('token');
      this.navigateService.navigateAndRefresh('');
    } else {
      this.navigateService.navigate('login');
    }
  }

  public isLoggedIn() {
    return this.sessionsStorageService.isLoggedIn;
  }
}
