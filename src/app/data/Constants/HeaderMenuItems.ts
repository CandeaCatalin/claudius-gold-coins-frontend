import { MenuItemModel } from './../../shared/models/MenuItemModel';
export const PRODUCTS_CATEGORIES: MenuItemModel[]=[
  {
    id: '4',
    link: '/category/monede-aur',
    name: 'Monede AUR',
    imagePath: 'assets/categories/monede_aur.png',
    orderIndex: 2,
    childs: [],
    isInternal: true
  },
  {
    id: '5',
    link: '/category/monede-argint',
    name: 'Monede ARGINT',
    imagePath: 'assets/categories/monede_argint.png',
    orderIndex: 3,
    childs: [],
    isInternal: true
  },
  
  {
    id: '6',
    link: '/category/monede-cupru',
    name: 'Monede CUPRU',
    imagePath: 'assets/categories/monede_cupru.png',
    orderIndex: 4,
    childs: [],
    isInternal: true
  },
  {
    id: '7',
    link: '/category/bijuterii-aur',
    name: 'Bijuterii AUR',
    imagePath: 'assets/categories/bijuterii_aur.png',
    orderIndex: 5,
    childs: [],
    isInternal: true
  },
  {
    id: '8',
    link: '/category/bijuterii-argint',
    imagePath: 'assets/categories/bijuterii_argint.png',
    name: 'Bijuterii ARGINT',
    orderIndex: 6,
    childs: [],
    isInternal: true
  }, 
  {
    id: '9',
    link: '/category/sold',
    imagePath: 'assets/categories/sold.png',
    name: 'SOLD',
    orderIndex: 7,
    childs: [],
    isInternal: true
  },
  { id: '10',
    link: '/claudius-gold-coins-and-amanet-deva',
    imagePath: 'assets/categories/amanet.jpg',
    name: 'Claudius Gold Coins & Amanet',
    orderIndex: 8,
    childs: [],
    isInternal: true
  }
];

export const MENU_ITEMS: MenuItemModel[] = [
  {
    id: '1',
    link: '/',
    name: 'Acasă',
    orderIndex: 1,
    childs: [],
    isInternal: true
  },
  {
    id: '2',
    link: '/category/toate-produsele',
    name: 'Shop',
    orderIndex: 2,
    childs: PRODUCTS_CATEGORIES,
    isInternal: true
  },
  {
    id: '9',
    link: '/despre-noi',
    name: 'Despre noi',
    orderIndex: 3,
    childs: [],
    isInternal: true
  },
  {
    id: '10',
    link: '/events',
    name: 'Events',
    orderIndex: 4,
    childs: [],
    isInternal: true
  },
  {
    id: '11',
    link: '/claudius-gold-coins-and-amanet-deva',
    name: 'Claudius Gold Coins & Amanet',
    orderIndex: 6,
    childs: [],
    isInternal: true
  },
  {
    id: '12',
    link: '/contact',
    name: 'Contact',
    orderIndex: 7,
    childs: [],
    isInternal: true
  },
  {
    id: '13',
    link: 'https://goldprice.org/',
    name: 'Gold Price',
    orderIndex: 8,
    childs: [],
    isInternal: false
  },
  {
    id: '14',
    link: 'https://www.kitco.com/charts/gold',
    name: 'Kitco',
    orderIndex: 9,
    childs: [],
    isInternal: false
  },
  
];
