import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MenuItemModel } from '../../shared/models/MenuItemModel';
import { MENU_ITEMS } from '../../data/Constants/HeaderMenuItems';
import { WindowRefService } from '../../shared/services/window-ref.service';
import { Subscription } from 'rxjs';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { UserActionsHeaderComponent } from "./user-actions-header/user-actions-header.component";
import { CommonModule } from '@angular/common';
import { DONT_DISPLAY_HEADER_PAGES } from '../../data/Constants/RoutesToDisplayComponenets';
@Component({
  selector: 'app-header',
  imports: [RouterModule, HamburgerMenuComponent, UserActionsHeaderComponent,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menuItems: MenuItemModel[] = MENU_ITEMS;
  public display: boolean = true;
  public screenWidth: number = 0;

  private subscriptions: Subscription[] = []; 

  constructor(private router: Router, private windowRefService: WindowRefService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(this.windowRefService.screenWidth$.subscribe(width => {
      this.screenWidth = width;
    }));
    this.subscriptions.push(this.router.events.subscribe(() => {
      this.display = !DONT_DISPLAY_HEADER_PAGES.includes(this.router.url); 
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();  
    });
  }
}
