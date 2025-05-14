import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { AdminService } from '../../../services/admin.service';
import { NavigateService } from './../../../services/navigate.service';
import { HttpRequestsService } from '../../../services/http-requests.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  imports: [NgxEditorModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements AfterViewInit, OnDestroy, OnInit {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private navigateService: NavigateService,
    private httpRequestsService: HttpRequestsService
  ) {
    this.form = this.fb.group({
      image: [null, [Validators.required]],
      title: ['', [Validators.required]],
      editorContent: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (!this.adminService.isAdmin()) {
      this.navigateService.navigate('/events');
    }
  }

  ngAfterViewInit(): void {
    this.editor = new Editor();
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
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getContent(): string {
    return this.form.controls['editorContent'].value || '';
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

  async onSubmit() {
    if (this.form.valid) {
      const file = this.form.value.image;

      try {
        // Convert the image file to ArrayBuffer
        const imageAsArrayBuffer = await file.arrayBuffer();

        // Create a Uint8Array from the ArrayBuffer (each element is a byte, which is a number)
        const imageBytes = Array.from(new Uint8Array(imageAsArrayBuffer));

        const body = {
          title: this.form.value.title,
          content: this.form.value.editorContent,
          imageBytes: imageBytes, // Send the image bytes as numbers
        };

        // Send the request
        this.subscriptions.push(
          this.httpRequestsService.post('events', body, true).subscribe({
            next: () => this.navigateService.navigate('/events'),
            error: (err) => console.error('Create event failed', err),
          })
        );
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
  }
}
