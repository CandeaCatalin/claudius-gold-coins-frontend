import { Component } from '@angular/core';
import { PRODUCTS_CATEGORIES } from '../../data/Constants/HeaderMenuItems';
import { MenuItemModel } from '../../shared/models/MenuItemModel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  product_categories: MenuItemModel[] = PRODUCTS_CATEGORIES;
}
