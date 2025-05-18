import { AuthConfig } from 'angular-oauth2-oidc';
import { GOOGLE_CLIENT_ID } from '../data/Constants/Constants';

export const authConfig: AuthConfig = {

  issuer: 'https://accounts.google.com',

  redirectUri: window.location.origin,

  clientId: GOOGLE_CLIENT_ID,

  scope: 'openid profile email',

  strictDiscoveryDocumentValidation: false,

};