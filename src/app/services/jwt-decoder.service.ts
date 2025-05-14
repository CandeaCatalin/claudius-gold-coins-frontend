import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  constructor() {}

  // This method will deserialize the JWT token and return its payload as a JSON object
  decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    // JWT token consists of 3 parts: header, payload, and signature
    const parts = token.split('.');

    // Check if the token has 3 parts
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = parts[1];

    // Decode the base64 URL-encoded payload
    const decodedPayload = this.decodeBase64Url(payload);

    // Convert the decoded string into a JSON object
    return JSON.parse(decodedPayload);
  }

  // Decode a base64 URL-encoded string
  private decodeBase64Url(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }

    return atob(base64);
  }
}
