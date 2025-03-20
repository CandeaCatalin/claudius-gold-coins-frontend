import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortModel } from '../../shared/models/SortModel';
import { Subscription } from 'rxjs';
import { WindowRefService } from '../../shared/services/window-ref.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products',
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  category: string = '';
  title: string = '';
  content: string = '';
  searchQuery: string = '';
  
    public screenWidth: number = 0;
  
    private subscriptions: Subscription[] = [];

  sortOptions : SortModel[] = [
    { value: 'recomanded',type:'asc', label: 'Recomandat' },
    { value: 'date',type:'asc', label: 'Cele mai noi' },
    { value: 'price',type:'asc', label: 'Preț (crescător)' },
    { value: 'price',type:'desc', label: 'Preț (descrescător)' },
    { value: 'name',type:'asc', label: 'Nume A - Z' },
    { value: 'name',type:'desc', label: 'Nume Z - A' },
  ];
  
  selectedSort: SortModel | undefined = this.sortOptions[0];
  
  constructor(private route: ActivatedRoute, private windowRefService: WindowRefService) {}
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();  
    });
  }
  ngOnInit(): void {
    this.subscriptions.push(this.windowRefService.screenWidth$.subscribe(width => {
      this.screenWidth = width;
    }));
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
