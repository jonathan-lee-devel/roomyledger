import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {IsActiveMatchOptions, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {MenuService} from './app.menu.service';
import {AppSidebarComponent} from './app.sidebar.component';
import {LayoutService} from './service/app.layout.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menuitem]',
  template: `
    <ng-container>
      <div
        *ngIf="root && item.visible !== false"
        class="layout-menuitem-root-text"
      >
        {{ item.label }}
      </div>
      <a
        *ngIf="(!item.routerLink || item.items) && item.visible !== false"
        [attr.href]="item.url"
        (click)="itemClick($event)"
        (mouseenter)="onMouseEnter()"
        [ngClass]="item.class"
        [attr.target]="item.target"
        tabindex="0"
        pRipple
        [pTooltip]="item.label"
        [tooltipDisabled]="!(isSlim && root && !active)"
      >
        <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
        <span class="layout-menuitem-text">{{ item.label }}</span>
        <i
          class="pi pi-fw pi-angle-down layout-submenu-toggler"
          *ngIf="item.items"
        ></i>
      </a>
      <a
        *ngIf="item.routerLink && !item.items && item.visible !== false"
        (click)="itemClick($event)"
        (mouseenter)="onMouseEnter()"
        [ngClass]="item.class"
        [routerLink]="item.routerLink"
        routerLinkActive="active-route"
        [routerLinkActiveOptions]="
          item.routerLinkActiveOptions || {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
          }
        "
        [fragment]="item.fragment"
        [queryParamsHandling]="item.queryParamsHandling"
        [preserveFragment]="item.preserveFragment!"
        [skipLocationChange]="item.skipLocationChange!"
        [replaceUrl]="item.replaceUrl!"
        [state]="item.state"
        [queryParams]="item.queryParams"
        [attr.target]="item.target"
        tabindex="0"
        pRipple
        [pTooltip]="item.label"
        [tooltipDisabled]="!(isSlim && root)"
      >
        <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
        <span class="layout-menuitem-text">{{ item.label }}</span>
        <i
          class="pi pi-fw pi-angle-down layout-submenu-toggler"
          *ngIf="item.items"
        ></i>
      </a>

      <ul
        #submenu
        *ngIf="item.items && item.visible !== false"
        [@children]="submenuAnimation"
        (@children.done)="onSubmenuAnimated($event)"
      >
        <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
          <li
            app-menuitem
            [item]="child"
            [index]="i"
            [parentKey]="key"
            [class]="child.badgeClass"
          ></li>
        </ng-template>
      </ul>
    </ng-container>
  `,
  animations: [
    trigger('children', [
      state(
          'collapsed',
          style({
            height: '0',
          }),
      ),
      state(
          'expanded',
          style({
            height: '*',
          }),
      ),
      state(
          'hidden',
          style({
            display: 'none',
          }),
      ),
      state(
          'visible',
          style({
            display: 'block',
          }),
      ),
      transition(
          'collapsed <=> expanded',
          animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'),
      ),
    ]),
  ],
})
export class AppMenuitemComponent
implements OnInit, AfterViewChecked, OnDestroy {
  // TODO: Fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  @ViewChild('submenu') submenu!: ElementRef;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string = '';

  constructor(
    public layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    private appSidebar: AppSidebarComponent,
    public router: Router,
    private menuService: MenuService,
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
        (value) => {
          Promise.resolve(null).then(() => {
            if (value.routeEvent) {
              this.active =
              value.key === this.key || value.key.startsWith(this.key + '-') ?
                true :
                false;
            } else {
              if (
                value.key !== this.key &&
              !value.key.startsWith(this.key + '-')
              ) {
                this.active = false;
              }
            }
          });
        },
    );

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .subscribe((params) => {
          if (this.isSlimPlus || this.isSlim) {
            this.active = false;
          } else {
            if (this.item.routerLink) {
              this.updateActiveStateFromRoute();
            }
          }
        });
  }

  get submenuAnimation() {
    if (
      this.layoutService.isDesktop() &&
      (this.layoutService.isSlim() || this.layoutService.isSlimPlus())
    ) {
      return this.active ? 'visible' : 'hidden';
    } else {
      return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
    }
  }

  get isSlim() {
    return this.layoutService.isSlim();
  }

  get isSlimPlus() {
    return this.layoutService.isSlimPlus();
  }

  get isMobile() {
    return this.layoutService.isMobile();
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  ngOnInit() {
    this.key = this.parentKey ?
      this.parentKey + '-' + this.index :
      String(this.index);

    if (!this.isSlim && this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  ngAfterViewChecked() {
    if (
      this.root &&
      this.active &&
      this.layoutService.isDesktop() &&
      (this.layoutService.isSlim() || this.layoutService.isSlimPlus())
    ) {
      this.calculatePosition(
          this.submenu?.nativeElement,
          this.submenu?.nativeElement.parentElement,
      );
    }
  }

  onSubmenuAnimated(event: AnimationEvent) {
    if (
      event.toState === 'visible' &&
      this.layoutService.isDesktop() &&
      (this.layoutService.isSlim() || this.layoutService.isSlimPlus())
    ) {
      const el = <HTMLUListElement>event.element;
      const elParent = <HTMLUListElement>el.parentElement;
      this.calculatePosition(el, elParent);
    }
  }

  calculatePosition(overlay: HTMLElement, target: HTMLElement) {
    if (overlay) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {left, top} = target.getBoundingClientRect();
      const vHeight = window.innerHeight;
      const oHeight = overlay.offsetHeight;
      const topbarEl = document.querySelector('.layout-topbar') as HTMLElement;
      const topbarHeight = topbarEl?.offsetHeight || 0;
      // reset
      overlay.style.top = '';
      overlay.style.left = '';

      if (this.layoutService.isSlim() || this.layoutService.isSlimPlus()) {
        const topOffset = top - topbarHeight;
        const height = topOffset + oHeight + topbarHeight;
        overlay.style.top =
          vHeight < height ?
            `${topOffset - (height - vHeight)}px` :
            `${topOffset}px`;
      }
    }
  }

  updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(
        this.item.routerLink[0],
      <IsActiveMatchOptions> this.item.routerLinkActiveOptions || {
          paths: 'exact',
          queryParams: 'ignored',
          matrixParams: 'ignored',
          fragment: 'ignored',
        },
    );

    if (activeRoute) {
      this.menuService.onMenuStateChange({key: this.key, routeEvent: true});
    }
  }

  itemClick(event: MouseEvent) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // navigate with hover
    if ((this.root && this.isSlim) || this.isSlimPlus) {
      this.layoutService.state.menuHoverActive =
        !this.layoutService.state.menuHoverActive;
    }

    // execute command
    if (this.item.command) {
      this.item.command({originalEvent: event, item: this.item});
    }

    // add tab
    if (
      event.metaKey &&
      this.item.routerLink &&
      (!this.item.data || !this.item.data.fullPage)
    ) {
      this.layoutService.onTabOpen(this.item);
      event.preventDefault();
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;

      if (this.root && this.active && (this.isSlim || this.isSlimPlus)) {
        this.layoutService.onOverlaySubmenuOpen();
      }
    } else {
      if (this.layoutService.isMobile()) {
        this.layoutService.state.staticMenuMobileActive = false;
      }

      if (this.isSlim || this.isSlimPlus) {
        this.menuService.reset();
        this.layoutService.state.menuHoverActive = false;
      }
    }

    this.menuService.onMenuStateChange({key: this.key});
  }

  onMouseEnter() {
    // activate item on hover
    if (
      this.root &&
      (this.isSlim || this.isSlimPlus) &&
      this.layoutService.isDesktop()
    ) {
      if (this.layoutService.state.menuHoverActive) {
        this.active = true;
        this.menuService.onMenuStateChange({key: this.key});
      }
    }
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
