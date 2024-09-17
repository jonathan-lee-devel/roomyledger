import {Component, OnInit} from '@angular/core';

import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: unknown[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        items: [
          {label: 'SaaS', icon: 'pi pi-desktop', routerLink: ['/']},
          {
            label: 'Sales',
            icon: 'pi pi-chart-bar',
            routerLink: ['/main-menu-sales'],
          },
        ],
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-star',
        routerLink: ['/uikit'],
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-id-card',
            routerLink: ['/uikit/formlayout'],
          },
          {
            label: 'Input',
            icon: 'pi pi-check-square',
            routerLink: ['/uikit/input'],
          },
          {
            label: 'Float Label',
            icon: 'pi pi-bookmark',
            routerLink: ['/uikit/floatlabel'],
          },
          {
            label: 'Invalid State',
            icon: 'pi pi-exclamation-circle',
            routerLink: ['/uikit/invalidstate'],
          },
          {label: 'Button', icon: 'pi pi-box', routerLink: ['/uikit/button']},
          {label: 'Table', icon: 'pi pi-table', routerLink: ['/uikit/table']},
          {label: 'List', icon: 'pi pi-list', routerLink: ['/uikit/list']},
          {label: 'Tree', icon: 'pi pi-share-alt', routerLink: ['/uikit/tree']},
          {label: 'Panel', icon: 'pi pi-tablet', routerLink: ['/uikit/panel']},
          {
            label: 'Overlay',
            icon: 'pi pi-clone',
            routerLink: ['/uikit/overlay'],
          },
          {label: 'Media', icon: 'pi pi-image', routerLink: ['/uikit/media']},
          {
            label: 'Menu',
            icon: 'pi pi-bars',
            routerLink: ['/uikit/menu'],
            routerLinkActiveOptions: {
              paths: 'subset',
              queryParams: 'ignored',
              matrixParams: 'ignored',
              fragment: 'ignored',
            },
          },
          {
            label: 'Message',
            icon: 'pi pi-comment',
            routerLink: ['/uikit/message'],
          },
          {label: 'File', icon: 'pi pi-file', routerLink: ['/uikit/file']},
          {
            label: 'Chart',
            icon: 'pi pi-chart-bar',
            routerLink: ['/uikit/charts'],
          },
          {
            label: 'Misc',
            icon: 'pi pi-circle-off',
            routerLink: ['/uikit/misc'],
          },
        ],
      },
      {
        label: 'Apps',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Blog',
            icon: 'pi pi-fw pi-comment',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/apps/blog/list'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/blog/detail'],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/blog/edit'],
              },
            ],
          },
          {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/apps/calendar'],
          },
          {
            label: 'Chat',
            icon: 'pi pi-fw pi-comments',
            routerLink: ['/apps/chat'],
          },
          {
            label: 'Files',
            icon: 'pi pi-fw pi-folder',
            routerLink: ['/apps/files'],
          },
          {
            label: 'Kanban',
            icon: 'pi pi-fw pi-sliders-v',
            routerLink: ['/apps/kanban'],
          },
          {
            label: 'Mail',
            icon: 'pi pi-fw pi-envelope',
            items: [
              {
                label: 'Inbox',
                icon: 'pi pi-fw pi-inbox',
                routerLink: ['/apps/mail/inbox'],
              },
              {
                label: 'Compose',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/mail/compose'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-comment',
                routerLink: ['/apps/mail/detail/1000'],
              },
            ],
          },
          {
            label: 'Task List',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/apps/tasklist'],
          },
        ],
      },
      {
        label: 'Prime Blocks',
        icon: 'pi pi-fw pi-prime',
        routerLink: ['/blocks'],
        items: [
          {
            label: 'Free Blocks',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/blocks'],
          },
          {
            label: 'All Blocks',
            icon: 'pi pi-fw pi-globe',
            url: 'https://www.primefaces.org/primeblocks-ng',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Utilities',
        icon: 'pi pi-fw pi-compass',
        routerLink: ['/utilities'],
        items: [
          {
            label: 'PrimeIcons',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['utilities/icons'],
          },
          {
            label: 'Colors',
            icon: 'pi pi-fw pi-palette',
            routerLink: ['utilities/colors'],
          },
          {
            label: 'PrimeFlex',
            icon: 'pi pi-fw pi-desktop',
            url: 'https://www.primefaces.org/primeflex/',
            target: '_blank',
          },
          {
            label: 'Figma',
            icon: 'pi pi-fw pi-pencil',
            url: 'https://www.figma.com/file/PgQXX4HXMPeCkT74tGajod/Preview-%7C-Verona-2022?node-id=1303%3A750',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/landing'],
            data: {fullPage: true},
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth-class/login'],
                data: {fullPage: true},
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth-class/error-class'],
                data: {fullPage: true},
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth-class/access'],
                data: {fullPage: true},
              },
              {
                label: 'Register',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/auth-class/register'],
                data: {fullPage: true},
              },
              {
                label: 'Forgot Password',
                icon: 'pi pi-fw pi-question',
                routerLink: ['/auth-class/forgotpassword'],
                data: {fullPage: true},
              },
              {
                label: 'New Password',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/auth-class/newpassword'],
                data: {fullPage: true},
              },
              {
                label: 'Verification',
                icon: 'pi pi-fw pi-envelope',
                routerLink: ['/auth-class/verification'],
                data: {fullPage: true},
              },
              {
                label: 'Lock Screen',
                icon: 'pi pi-fw pi-eye-slash',
                routerLink: ['/auth-class/lockscreen'],
                data: {fullPage: true},
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/pages/crud'],
          },
          {
            label: 'Timeline',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/pages/timeline'],
          },
          {
            label: 'Invoice',
            icon: 'pi pi-fw pi-dollar',
            routerLink: ['/pages/invoice'],
          },
          {
            label: 'About Us',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/pages/aboutus'],
          },
          {
            label: 'Help',
            icon: 'pi pi-fw pi-question-circle',
            routerLink: ['/pages/help'],
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/pages/notfound'],
          },
          {
            label: 'Empty',
            icon: 'pi pi-fw pi-circle-off',
            routerLink: ['/pages/empty'],
          },
          {
            label: 'FAQ',
            icon: 'pi pi-fw pi-question',
            routerLink: ['/pages/faq'],
          },
          {
            label: 'Contact Us',
            icon: 'pi pi-fw pi-phone',
            routerLink: ['/pages/contact'],
          },
        ],
      },
      {
        label: 'E-Commerce',
        icon: 'pi pi-fw pi-wallet',
        items: [
          {
            label: 'Product Overview',
            icon: 'pi pi-fw pi-image',
            routerLink: ['ecommerce/product-overview'],
          },
          {
            label: 'Product List',
            icon: 'pi pi-fw pi-list',
            routerLink: ['ecommerce/product-list'],
          },
          {
            label: 'New Product',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['ecommerce/new-product'],
          },
          {
            label: 'Shopping Cart',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['ecommerce/shopping-cart'],
          },
          {
            label: 'Checkout Form',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['ecommerce/checkout-form'],
          },
          {
            label: 'Order History',
            icon: 'pi pi-fw pi-history',
            routerLink: ['ecommerce/order-history'],
          },
          {
            label: 'Order Summary',
            icon: 'pi pi-fw pi-file',
            routerLink: ['ecommerce/order-summary'],
          },
        ],
      },
      {
        label: 'User Management',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: ['profile/list'],
          },
          {
            label: 'Create',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['profile/create'],
          },
        ],
      },
      {
        label: 'Hierarchy',
        icon: 'pi pi-align-left',
        items: [
          {
            label: 'Submenu 1',
            icon: 'pi pi-align-left',
            items: [
              {
                label: 'Submenu 1.1',
                icon: 'pi pi-align-left',
                items: [
                  {label: 'Submenu 1.1.1', icon: 'pi pi-align-left'},
                  {label: 'Submenu 1.1.2', icon: 'pi pi-align-left'},
                  {label: 'Submenu 1.1.3', icon: 'pi pi-align-left'},
                ],
              },
              {
                label: 'Submenu 1.2',
                icon: 'pi pi-align-left',
                items: [{label: 'Submenu 1.2.1', icon: 'pi pi-align-left'}],
              },
            ],
          },
          {
            label: 'Submenu 2',
            icon: 'pi pi-align-left',
            items: [
              {
                label: 'Submenu 2.1',
                icon: 'pi pi-align-left',
                items: [
                  {label: 'Submenu 2.1.1', icon: 'pi pi-align-left'},
                  {label: 'Submenu 2.1.2', icon: 'pi pi-align-left'},
                ],
              },
              {
                label: 'Submenu 2.2',
                icon: 'pi pi-align-left',
                items: [{label: 'Submenu 2.2.1', icon: 'pi pi-align-left'}],
              },
            ],
          },
        ],
      },
      {
        label: 'Start',
        icon: 'pi pi-download',
        items: [
          {
            label: 'Buy Now',
            icon: 'pi pi-shopping-cart',
            url: 'https://www.primefaces.org/store',
          },
          {
            label: 'Documentation',
            icon: 'pi pi-info-circle',
            routerLink: ['/documentation'],
          },
        ],
      },
    ];
  }
}
