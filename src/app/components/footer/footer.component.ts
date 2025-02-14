import { Component } from '@angular/core';
import { MenuItemModel } from '../../shared/models/MenuItemModel';
import { MENU_ITEMS } from '../../data/Constants/HeaderMenuItems';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WindowRefService } from '../../shared/services/window-ref.service';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  public menuItems: MenuItemModel[] = MENU_ITEMS;
  year: number = new Date().getFullYear();
  public screenWidth: number = 0;
  
    private subscriptions: Subscription[] = []; 
  
    constructor(private windowRefService: WindowRefService) {}
  
    ngOnInit() {
      this.subscriptions.push(this.windowRefService.screenWidth$.subscribe(width => {
        this.screenWidth = width;
      }));
    }
  
    ngOnDestroy() {
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();  
      });
    }
}
