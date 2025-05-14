import { Injectable } from '@angular/core';
import { JwtDecoderService } from './jwt-decoder.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private jwtdecoderService: JwtDecoderService,
    private sessionStorageService: SessionStorageService
  ) {}

  public isAdmin() {
    const token = this.sessionStorageService.getItem('token');
    if (token != null) {
      var role = this.jwtdecoderService.decodeToken(token).role;
      if (role == true) {
        return true;
      }
    }
    return false;
  }
}
