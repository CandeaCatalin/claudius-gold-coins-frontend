import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
@Component({
  selector: 'app-create-event',
  imports: [NgxEditorModule, ReactiveFormsModule,CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements AfterViewInit , OnDestroy {
  
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      image: [null,[Validators.required]],
      title:['',[Validators.required]],
      editorContent: ['', [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    this.editor = new Editor();
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
  
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      // Store the file in FormGroup
      this.form.patchValue({ image: file });

      // Convert image to Base64 for preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}
