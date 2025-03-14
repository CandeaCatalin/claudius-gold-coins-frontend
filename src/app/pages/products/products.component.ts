import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortModel } from '../../shared/models/SortModel';


@Component({
  selector: 'app-products',
  imports: [RouterModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  category: string = '';
  title: string = '';
  content: string = '';
  searchQuery: string = '';
  
  sortOptions : SortModel[] = [
    { value: 'recomanded',type:'asc', label: 'Recomandat' },
    { value: 'date',type:'asc', label: 'Cele mai noi' },
    { value: 'price',type:'asc', label: 'Preț (crescător)' },
    { value: 'price',type:'desc', label: 'Preț (descrescător)' },
    { value: 'name',type:'asc', label: 'Nume A - Z' },
    { value: 'name',type:'desc', label: 'Nume Z - A' },
  ];
  
  selectedSort: SortModel | undefined = this.sortOptions[0];
  
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params?.get('category') || '';
      this.title = this.category
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
    });
  }

  onSortChange() {
    console.log('Selected sort option:', this.selectedSort);
  }

  onSearchChange() {
    console.log('Search query:', this.searchQuery);
    this.searchQuery = "";
  }
}
