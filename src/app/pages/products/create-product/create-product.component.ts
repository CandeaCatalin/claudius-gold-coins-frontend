import { NavigateService } from './../../../services/navigate.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CATEGORIES, CATEGORY_TYPE } from '../../../data/Constants/Constants';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'app-create-product',
  imports: [NgxEditorModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  form: FormGroup;
  mainImagePreview: string | ArrayBuffer | null = null;
  imagePreviews: string[] = [];
  selectedImage: string | null = null;
  subscriptions: Subscription[] = [];
  categoryList = CATEGORIES;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private navigateService: NavigateService,
    private httpRequestsService: HttpRequestsService
  ) {
    this.form = this.fb.group({
      images: this.fb.array([]),
      category: ['', [Validators.required]],
      mainImage: [null, [Validators.required]],
      name: ['', [Validators.required]],
      editorContent: ['', [Validators.required]],
      price: [0, [Validators.required]],
      priceModifier: [0, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.editor = new Editor();
  }

  ngOnInit(): void {
    if (!this.adminService.isAdmin()) {
      this.navigateService.navigate('/events');
    }
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  onImageFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.images.push(this.fb.control(file)); // Store in FormArray

        // Convert image to Base64 for preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
      }
    }
  }

  editor = new Editor();

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  getContent(): string {
    if (this.form.controls['editorContent'].value != null) {
      return this.form.controls['editorContent'].value;
    } else {
      return '';
    }
  }

  onMainImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      // Store the file in FormGroup
      this.form.patchValue({ mainImage: file });

      // Convert image to Base64 for preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.mainImagePreview = reader.result;
      };
    }
  }

  removeImage(index: number) {
    this.images.removeAt(index); // Remove from FormArray
    this.imagePreviews.splice(index, 1); // Remove from previews
  }

  async onSubmit() {
    if (this.form.valid) {
      const file = this.form.value.mainImage;

      try {
        // Convert the image file to ArrayBuffer
        const imageAsArrayBuffer = await file.arrayBuffer();

        // Create a Uint8Array from the ArrayBuffer (each element is a byte, which is a number)
        const imageBytes = Array.from(new Uint8Array(imageAsArrayBuffer));
        const imagesBytes = await Promise.all(
          this.form.value.images.map(async (image: any) => {
            const imageAsArrayBuffer = await image.arrayBuffer();
            return Array.from(new Uint8Array(imageAsArrayBuffer));
          })
        );

        const body = {
          name: this.form.value.name,
          content: this.form.value.editorContent,
          mainImageBytes: imageBytes,
          imagesBytes: imagesBytes,
          category: this.form.value.category,
          price: this.form.value.price,
          priceModifier: this.form.value.priceModifier,
        };
        // Send the request
        this.subscriptions.push(
          this.httpRequestsService.post('products/', body, true).subscribe({
            next: (r) => {
              var productId = r.id;
              var imagesSubscriptions: Subscription[] = [];
              imagesBytes.forEach((element) => {
                const body = {
                  imageBytes: element,
                  productId: productId,
                };
                imagesSubscriptions.push(
                  this.httpRequestsService
                    .post('products/addImage', body, true)
                    .subscribe({
                      next: (r) => {
                        console.log(r);
                      },
                      error: (err) => console.error('Add image failed', err),
                    })
                );
              });
              imagesSubscriptions.forEach((x) => x.unsubscribe);
              this.navigateService.navigate('category/toate-produsele');
            },
            error: (err) => console.error('Create product failed', err),
          })
        );
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
  }
  openImage(image: string) {
    this.selectedImage = image; // Set selected image
  }

  closeImage() {
    this.selectedImage = null; // Close modal
  }
}
