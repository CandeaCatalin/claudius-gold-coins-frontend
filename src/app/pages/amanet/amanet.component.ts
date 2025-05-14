import { Component } from '@angular/core';

@Component({
  selector: 'app-amanet',
  imports: [],
  templateUrl: './amanet.component.html',
  styleUrl: './amanet.component.scss',
})
export class AmanetComponent {
  public numbers = Array.from({ length: 20 }, (_, i) => i + 1);
}
