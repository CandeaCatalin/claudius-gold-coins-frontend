import { NavigateService } from './../../../services/navigate.service';
import { AdminService } from './../../../services/admin.service';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestsService } from '../../../services/http-requests.service';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../../shared/models/ProductModel';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  isBrowser: boolean;
  id: string | null = null;
  selectedImageIndex: number = 0;
  product: ProductModel | null = null;
  isLoading: boolean = true;
  subscriptions: Subscription[] = [];
  constructor(
    private navigateService: NavigateService,
    private adminService: AdminService,
    private location: Location,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpRequestsService: HttpRequestsService,
    private cartService: CartService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.isLoading = true;
      this.subscriptions.push(
        this.httpRequestsService
          .get(`products/getProductById/${this.id}`, false)
          .subscribe({
            next: (response: any) => {
              this.product = response;
              if (this.product != null) {
                var priceOfMetal = 1;
                this.product.totalPrice =
                  this.product.price +
                  (this.product.priceModifier * priceOfMetal) / 100;
                var images: string[] = [];
                this.product.images.forEach((x) =>
                  images.push(this.convertImageBytesToImage(x))
                );
                this.product.images = images;
              }
              this.isLoading = false;
            },
            error: (err) => console.error('Login failed', err),
          })
      );
    }
  }
  setSelectedImage(index: number) {
    this.selectedImageIndex = index;
  }
  nextImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex + 1) % this.product!.images.length;
  }
  prevImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.product!.images.length) %
      this.product!.images.length;
  }

  async addToCart() {
    this.cartService.addProductToCart(this.product);
    this.location.back();
  }
  convertImageBytesToImage(image: any) {
    // Step 1: Convert the array of bytes into a Uint8Array
    const byteArray = new Uint8Array(image.image.data);

    // Step 2: Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type as per your image format (e.g., 'image/png')

    // Step 3: Create an object URL for the Blob
    return URL.createObjectURL(blob); // This URL can be used as an img src
  }

  zoom(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    const zoomedImage = img.closest('.main-image')!.querySelector('img')!;
    const { offsetX, offsetY } = event;
    const { width, height } = img;

    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;

    zoomedImage.style.transformOrigin = `${x}% ${y}%`;
    zoomedImage.style.transform = 'scale(2)';
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }
  resetZoom(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    const zoomedImage = img.closest('.main-image')!.querySelector('img')!;
    zoomedImage.style.transform = 'scale(1)';
  }
  markAsSold() {
    this.subscriptions.push(
      this.httpRequestsService
        .post('products/margAsSold', { id: this.id }, true)
        .subscribe({
          next: () =>
            this.navigateService.navigate('/category/toate-produsele'),
          error: (err) => console.log(err),
        })
    );
  }
  deleteProduct() {
    this.subscriptions.push(
      this.httpRequestsService.delete(`products/${this.id}`, true).subscribe({
        next: () => this.navigateService.navigate('/category/toate-produsele'),
        error: (err) => console.log(err),
      })
    );
  }
  public isAdmin() {
    return this.adminService.isAdmin();
  }
}
