import { RouterModule } from '@angular/router';
import { MenuItemModel } from '../../../shared/models/MenuItemModel';
import { MENU_ITEMS } from './../../../data/Constants/HeaderMenuItems';
import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { UserActionsHeaderComponent } from "../user-actions-header/user-actions-header.component";

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, UserActionsHeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();
  public menuItems: MenuItemModel[] = MENU_ITEMS;

  constructor(private elementRef: ElementRef) {}

  close() {
    this.closeSidebar.emit();
  }

  // Detect clicks outside the sidebar
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }
}
