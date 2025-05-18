import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderModel } from '../../shared/models/OrderModel';
import { ProductModel } from '../../shared/models/ProductModel';
import { UserModel } from '../../shared/models/UserModel';


const ORDERS: OrderModel[] = [
];

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  title= "Comenzile mele";
  allOrders: OrderModel[] = ORDERS;

  ngOnInit() {
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.allOrders = this.allOrders.filter(order => 
      order.id.toLowerCase().includes(filterValue) || 
      order.user.name.toLowerCase().includes(filterValue) ||
      order.product.name.toLowerCase().includes(filterValue) ||
      order.product.category.toLowerCase().includes(filterValue) ||
      order.status.toLowerCase().includes(filterValue) ||
      order.address.toLowerCase().includes(filterValue)
    );
  }

  sortData(column: keyof OrderModel | 'product.name' | 'product.category' | 'product.price' | 'user.name') {
    this.allOrders = [...this.allOrders].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      if(column.startsWith('product.')){
        aValue = (a.product?.[column.split('.')[1] as keyof ProductModel] ?? '');
        bValue = (b.product?.[column.split('.')[1] as keyof ProductModel] ?? ''); 
      }else if(column.startsWith('user.')){
        aValue = (a.user?.[column.split('.')[1] as keyof UserModel] ?? '');
        bValue = (b.user?.[column.split('.')[1] as keyof UserModel] ?? ''); 
      }else{
        aValue = (a[column as keyof OrderModel] ?? '');
        aValue = (b[column as keyof OrderModel] ?? '');
      }
     
      return aValue.toString().localeCompare(bValue.toString(), undefined, { numeric: true });
    });
  }

  onSubmit(){
    console.log("submited");
  }
}
