import { Injectable } from '@angular/core';
import { SessionStorage } from '../data/Constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = SessionStorage.jwt_token;

  constructor() {}

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}
