import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-actions-header',
  imports: [RouterModule],
  templateUrl: './user-actions-header.component.html',
  styleUrl: './user-actions-header.component.scss'
})
export class UserActionsHeaderComponent {
  cartCount = 10;
}
