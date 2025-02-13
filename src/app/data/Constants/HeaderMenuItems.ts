import { MenuItemModel } from './../../shared/models/MenuItemModel';
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
    link: '/category/all-products',
    name: 'Shop',
    orderIndex: 2,
    childs: [
      {
        id: '3',
        link: '/category/all-products',
        name: 'Toate Produsele',
        orderIndex: 1,
        childs: [],
        isInternal: true
      },
      {
        id: '4',
        link: '/category/bijuterii-argint',
        name: 'Bijuterii Argint',
        orderIndex: 2,
        childs: [],
        isInternal: true
      },
      {
        id: '5',
        link: '/category/bijuterii-aur',
        name: 'Bijuterii Aur',
        orderIndex: 3,
        childs: [],
        isInternal: true
      },
      {
        id: '6',
        link: '/category/monede-argint',
        name: 'Monede Argint',
        orderIndex: 4,
        childs: [],
        isInternal: true
      },
      {
        id: '7',
        link: '/category/monede-aur',
        name: 'Monede Aur',
        orderIndex: 5,
        childs: [],
        isInternal: true
      },
      {
        id: '8',
        link: '/category/monede-Cupru',
        name: 'Monede Cupru',
        orderIndex: 6,
        childs: [],
        isInternal: true
      },
    ],
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