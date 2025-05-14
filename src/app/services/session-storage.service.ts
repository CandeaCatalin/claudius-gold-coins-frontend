import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public isLoggedIn = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.checkToken(); // Only runs in browser
    }
  }

  private checkToken() {
    if (!this.isBrowser) return;
    const token = this.getItem('token');
    this.isLoggedIn = token != null;
  }

  setItem(key: string, value: any): void {
    if (!this.isBrowser) return;
    const val = typeof value === 'object' ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, val);
    this.checkToken();
  }

  getItem(key: string): any {
    if (!this.isBrowser) return null;
    const value = sessionStorage.getItem(key);
    try {
      return JSON.parse(value as string);
    } catch {
      return value;
    }
  }

  removeItem(key: string): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(key);
    this.checkToken();
  }

  clear(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
    this.checkToken();
  }
}
