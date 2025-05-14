import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'despre-noi',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'terms-and-conditions',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'claudius-gold-coins-and-amanet-deva',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'category/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { category: 'monede-aur' },
        { category: 'monede-cupru' },
        { category: 'bijuterii-aur' },
        { category: 'bijuterii-argint' },
        { category: 'sold' },
        { category: 'monede-aur' },
      ];
    },
    fallback: PrerenderFallback.Client,
  },
  {
    path: 'events',
    renderMode: RenderMode.Client,
  },
  {
    path: 'create-event',
    renderMode: RenderMode.Client,
  },
  {
    path: ':category/:name',
    renderMode: RenderMode.Client,
  },
  {
    path: 'orders',
    renderMode: RenderMode.Client,
  },
  {
    path: 'create-product',
    renderMode: RenderMode.Client,
  },
];
