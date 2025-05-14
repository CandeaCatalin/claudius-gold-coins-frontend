import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'fail';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  constructor() {}

  showToast(message: string, type: 'success' | 'fail'): void {
    this.toastSubject.next({ message, type });
    setTimeout(() => {
      this.toastSubject.next(null); // Hide toast after 3 seconds
    }, 3000);
  }
}
