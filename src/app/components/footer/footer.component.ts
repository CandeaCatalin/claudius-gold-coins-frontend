import { Component } from '@angular/core';
import { MenuItemModel } from '../../shared/models/MenuItemModel';
import { MENU_ITEMS } from '../../data/Constants/HeaderMenuItems';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WindowRefService } from '../../shared/services/window-ref.service';
import { DONT_DISPLAY_FOOTER_PAGES } from '../../data/Constants/RoutesToDisplayComponenets';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public menuItems: MenuItemModel[] = MENU_ITEMS;
  public screenWidth: number = 0;
  public display: boolean = true;
  year: number = new Date().getFullYear();

  private subscriptions: Subscription[] = [];

  constructor(
    public router: Router,
    private windowRefService: WindowRefService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.windowRefService.screenWidth$.subscribe((width) => {
        this.screenWidth = width;
      })
    );

    this.subscriptions.push(
      this.router.events.subscribe(() => {
        this.display = !DONT_DISPLAY_FOOTER_PAGES.includes(this.router.url);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
