import { NavigateService } from './../../services/navigate.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortModel } from '../../shared/models/SortModel';
import { Subscription } from 'rxjs';
import { WindowRefService } from '../../shared/services/window-ref.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { HttpRequestsService } from '../../services/http-requests.service';
import { ProductModel } from '../../shared/models/ProductModel';
import { MenuItemModel } from '../../shared/models/MenuItemModel';
import { PRODUCTS_CATEGORIES_SHOP_MENU } from '../../data/Constants/HeaderMenuItems';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-products',
  imports: [RouterModule, FormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  category: string = '';
  title: string = '';
  content: string = '';
  product_categories: MenuItemModel[] = PRODUCTS_CATEGORIES_SHOP_MENU;
  productsList: ProductModel[] = [];
  initialProductsList: ProductModel[] = [];
  searchQuery: string = '';
  isLoading = true;
  public screenWidth: number = 0;

  private subscriptions: Subscription[] = [];

  sortOptions: SortModel[] = [
    { value: 'date', type: 'asc', label: 'Cele mai noi' },
    { value: 'totalPrice', type: 'asc', label: 'Preț (crescător)' },
    { value: 'totalPrice', type: 'desc', label: 'Preț (descrescător)' },
    { value: 'name', type: 'asc', label: 'Nume A - Z' },
    { value: 'name', type: 'desc', label: 'Nume Z - A' },
  ];

  selectedSort: SortModel = this.sortOptions[0];

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private windowRefService: WindowRefService,
    private adminService: AdminService,
    private navigateService: NavigateService,
    private httpRequestsService: HttpRequestsService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.windowRefService.screenWidth$.subscribe((width) => {
        this.screenWidth = width;
      })
    );
    this.route.paramMap.subscribe((params) => {
      this.category = params?.get('category') || '';
      this.title = this.category
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase());
      this.isLoading = true;
      this.subscriptions.push(
        this.httpRequestsService.get(`products/${this.category}`).subscribe({
          next: (response: any) => {
            this.productsList = response;
            var priceOfMetal = 1;
            this.productsList.forEach(
              (x) =>
                (x.totalPrice =
                  x.price + (x.priceModifier * priceOfMetal) / 100)
            );
            this.productsList.forEach(
              (x) => (x.mainImage = this.convertImageBytesToImage(x.mainImage))
            );
            this.initialProductsList = this.productsList;
            this.isLoading = false;
          },
          error: (err) => console.error('Login failed', err),
        })
      );
      this.cdr.detectChanges();
    });
  }

  onSortChange(event: Event) {
    this.productsList = this.productsList = this.dynamicSort(
      this.productsList,
      this.selectedSort.value as keyof ProductModel,
      this.selectedSort.type
    );
    this.cdr.detectChanges();
  }

  onSearchChange() {
    this.productsList = this.initialProductsList.filter((x) =>
      x.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.searchQuery = '';

    this.cdr.detectChanges();
  }

  public isAdmin() {
    return this.adminService.isAdmin();
  }
  public navigateToAddProduct() {
    this.navigateService.navigate('create-product');
  }

  productsPerPage = 8;
  currentPage = 1;

  get totalPages(): number {
    var tp = Math.ceil(this.productsList.length / this.productsPerPage);
    return tp === 0 ? 1 : tp;
  }

  get currentProducts() {
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    const visible = this.productsList.slice(start, end);
    const emptySlots = this.productsPerPage - visible.length;
    return [...visible, ...Array(emptySlots).fill(null)];
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo(0, 0);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo(0, 0);
    }
  }

  navigateToProductDetails(product: ProductModel) {
    this.navigateService.navigateWithQueryParam(
      `${product.category}/${this.formatNameForUrl(product.name)}`,
      { id: product.id }
    );
  }
  private formatNameForUrl(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD') // remove diacritics
      .replace(/[\u0300-\u036f]/g, '') // remove accent marks
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .trim()
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove multiple hyphens
  }
  convertImageBytesToImage(imageBytes: any) {
    // Step 1: Convert the array of bytes into a Uint8Array
    const byteArray = new Uint8Array(imageBytes.data);

    // Step 2: Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type as per your image format (e.g., 'image/png')

    // Step 3: Create an object URL for the Blob
    this.cdr.detectChanges();
    return URL.createObjectURL(blob); // This URL can be used as an img src
  }

  dynamicSort<T>(arr: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc') {
    const dir = direction === 'asc' ? 1 : -1;
    return arr.sort((a, b) => {
      if (a[key] < b[key]) return -1 * dir;
      if (a[key] > b[key]) return 1 * dir;
      return 0;
    });
  }
}
