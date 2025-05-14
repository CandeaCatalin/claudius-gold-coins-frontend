import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  private baseUrl = 'http://localhost:3000/';

  private getAuthorizationHeaders() {
    const token = this.sessionStorageService.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  post(path: string, body: any, withAuth = false): Observable<any> {
    if (withAuth) {
      const headers = this.getAuthorizationHeaders();
      return this.http.post(this.baseUrl + path, body, { headers });
    } else {
      return this.http.post(this.baseUrl + path, body);
    }
  }

  postForCarts(
    path: string,
    body: any,
    withAuth = false,
    guestToken: string
  ): Observable<any> {
    if (withAuth) {
      const token = this.sessionStorageService.getItem('token');
      var headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'x-cart-token': guestToken || '',
      });
      return this.http.post(this.baseUrl + path, body, { headers });
    } else {
      var headers = new HttpHeaders({
        'x-cart-token': guestToken || '',
      });
      return this.http.post(this.baseUrl + path, body, { headers });
    }
  }

  getForCarts(path: string, withAuth = false, guestToken: string) {
    if (withAuth) {
      const token = this.sessionStorageService.getItem('token');
      var headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'x-cart-token': guestToken || '',
      });
      return this.http.get(this.baseUrl + path, { headers });
    } else {
      var headers = new HttpHeaders({
        'x-cart-token': guestToken || '',
      });
      return this.http.get(this.baseUrl + path, { headers });
    }
  }

  get(path: string, withAuth = false) {
    if (withAuth) {
      const headers = this.getAuthorizationHeaders();
      return this.http.get(this.baseUrl + path, { headers });
    } else {
      return this.http.get(this.baseUrl + path);
    }
  }

  delete(path: string, withAuth = false) {
    if (withAuth) {
      const headers = this.getAuthorizationHeaders();
      return this.http.delete(this.baseUrl + path, { headers });
    } else {
      return this.http.delete(this.baseUrl + path);
    }
  }
}
