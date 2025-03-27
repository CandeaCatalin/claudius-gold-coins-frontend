import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CATEGORIES, CATEGORY_TYPE } from '../../../data/Constants/Constants';

@Component({
  selector: 'app-create-product',
  imports: [NgxEditorModule, ReactiveFormsModule,CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements AfterViewInit , OnDestroy {

  form: FormGroup;
  mainImagePreview: string | ArrayBuffer | null = null;
  imagePreviews: string[] = [];
  selectedImage: string | null = null;
  categoryList = CATEGORIES;
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      images: this.fb.array([]),
      category:[CATEGORIES[0], [Validators.required]],
      mainImage: [null,[Validators.required]],
      name:['',[Validators.required]],
      editorContent: ['', [Validators.required]],
      price:[0,[Validators.required]],
      priceModifier:[0,[Validators.required]]
    });
  }
  ngAfterViewInit(): void {
    this.editor = new Editor();
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
    // default value
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
  onClick():void{
    console.log(this.form.controls["editorContent"].value);
  }
  getContent():string{
    if(this.form.controls["editorContent"].value !=null){
      return this.form.controls["editorContent"].value;
    }
    else{
      return "";
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

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }

  openImage(image: string) {
    this.selectedImage = image; // Set selected image
  }

  closeImage() {
    this.selectedImage = null; // Close modal
  }
}
