import { Component } from '@angular/core';
import { OrderModel } from '../../shared/models/OrderModel';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../shared/models/ProductModel';
import { UserModel } from '../../shared/models/UserModel';

const ORDERS: OrderModel[] = [];

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  title = 'Comenzile mele';
  allOrders: OrderModel[] = ORDERS;
  filteredOrders: OrderModel[] = ORDERS;
  paginatedOrders: OrderModel[] = [];

  currentPage: number = 1;
  pageSize: number = 1;
  totalPages: number = 2;
  totalPagesArray: number[] = [];

  ngOnInit() {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
    this.totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
    this.paginatedOrders = this.filteredOrders.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredOrders = this.allOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(filterValue) ||
        order.user.name.toLowerCase().includes(filterValue) ||
        order.product.name.toLowerCase().includes(filterValue) ||
        order.product.category.toLowerCase().includes(filterValue) ||
        order.status.toLowerCase().includes(filterValue) ||
        order.address.toLowerCase().includes(filterValue)
    );
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  sortData(
    column:
      | keyof OrderModel
      | 'product.name'
      | 'product.category'
      | 'product.price'
      | 'user.name'
  ) {
    this.filteredOrders = [...this.filteredOrders].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      if (column.startsWith('product.')) {
        aValue = a.product?.[column.split('.')[1] as keyof ProductModel] ?? '';
        bValue = b.product?.[column.split('.')[1] as keyof ProductModel] ?? '';
      } else if (column.startsWith('user.')) {
        aValue = a.user?.[column.split('.')[1] as keyof UserModel] ?? '';
        bValue = b.user?.[column.split('.')[1] as keyof UserModel] ?? '';
      } else {
        aValue = a[column as keyof OrderModel] ?? '';
        aValue = b[column as keyof OrderModel] ?? '';
      }

      return aValue
        .toString()
        .localeCompare(bValue.toString(), undefined, { numeric: true });
    });

    this.updatePagination();
  }
}
