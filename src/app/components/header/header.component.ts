import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItemModel } from '../../shared/models/MenuItemModel';
import { MENU_ITEMS } from '../../data/Constants/HeaderMenuItems';
import { WindowRefService } from '../../shared/services/window-ref.service';
import { Subscription } from 'rxjs';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { UserActionsHeaderComponent } from "./user-actions-header/user-actions-header.component";
@Component({
  selector: 'app-header',
  imports: [RouterModule, HamburgerMenuComponent, UserActionsHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menuItems: MenuItemModel[] = MENU_ITEMS;
  screenWidth: number = 0;
  private screenWidthSubscription!: Subscription; 

  constructor(private windowRefService: WindowRefService) {}

  ngOnInit() {
    this.screenWidthSubscription = this.windowRefService.screenWidth$.subscribe(width => {
      this.screenWidth = width;
      console.log('Updated Width:', width);
    });
  }

  ngOnDestroy() {
    if (this.screenWidthSubscription) {
      this.screenWidthSubscription.unsubscribe();
      console.log('Unsubscribed from screen width changes');
    }
  }
}
