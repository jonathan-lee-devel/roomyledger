import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ShepherdService} from 'angular-shepherd';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {Ripple} from 'primeng/ripple';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import {BehaviorSubject, filter, Subscription, take, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from '../../../../app.routes';
import {UtilService} from '../../../../services/util/util.service';
import {RouterUtils} from '../../../../util/router/Router.utils';
import {H1DarkModeComponent} from '../../../lib/_dark-mode/h1-dark-mode/h1-dark-mode.component';
import {PDarkModeComponent} from '../../../lib/_dark-mode/p-dark-mode/p-dark-mode.component';
import {CustomSplitsTabComponent} from '../../../lib/_expenses/custom-splits-tab/custom-splits-tab.component';
import {ExpenseActionMenuComponent} from '../../../lib/_expenses/expense-action-menu/expense-action-menu.component';
import {ExpenseTabComponent} from '../../../lib/_expenses/expense-tab/expense-tab.component';
import {
  PropertyDashboardPeopleTabComponent,
} from '../../../lib/_properties/property-dashboard-people-tab/property-dashboard-people-tab.component';
import {ReportsTabComponent} from '../../../lib/_properties/reports-tab/reports-tab.component';

@Component({
  selector: 'app-properties-main-menu',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    MatProgressBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    ExpenseActionMenuComponent,
    ExpenseTabComponent,
    ExpenseTabComponent,
    TabViewModule,
    ReportsTabComponent,
    ToolbarModule,
    Button,
    SplitButtonModule,
    PropertyDashboardPeopleTabComponent,
    NgClass,
    TabMenuModule,
    Ripple,
    PDarkModeComponent,
    H1DarkModeComponent,
    ProgressSpinnerModule,
    CustomSplitsTabComponent,
  ],
  templateUrl: './properties-dashboard.component.html',
  styleUrl: './properties-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PropertiesDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly expensesStore = inject(ExpensesStore);
  protected propertyId: string = '';
  protected date: FormControl<Date | null> = new FormControl<Date>(new Date());
  protected readonly EXPENSE_TAB_INDEX = 0;
  protected readonly CUSTOM_SPLITS_TAB_INDEX = 1;
  protected readonly REPORTS_TAB_INDEX = 2;
  protected readonly PEOPLE_TAB_INDEX = 3;
  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly rebaseRoutePathAsString = rebaseRoutePathAsString;
  protected items: MenuItem[] | undefined;
  protected activeItem: MenuItem | undefined = undefined;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly utilService = inject(UtilService);
  private readonly TAB_QUERY_PARAM_KEY = 'tab';
  private readonly isInitialLoad = new BehaviorSubject<boolean>(true);
  private readonly shepherdService = inject(ShepherdService);
  private routeParamsSubscription?: Subscription;
  private routeQueryParamsSubscription?: Subscription;

  constructor() {
    this.items = [
      {label: 'Expenses', icon: 'pi pi-dollar', styleClass: 'tab-class-expenses'},
      {label: 'Custom Splits', icon: 'pi pi-percentage', styleClass: 'tab-class-custom-splits'},
      {label: 'Reports', icon: 'pi pi-chart-line', styleClass: 'tab-class-reports'},
      {label: 'People', icon: 'pi pi-users', styleClass: 'tab-class-people'},
    ];
    this.activeItem = this.items[this.EXPENSE_TAB_INDEX];
  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
        .pipe(
            filter((params) => !!params['propertyId']),
            tap((params) => {
              this.propertyId = params['propertyId'];
              this.propertiesStore.loadPropertyById(this.propertyId);
            }),
        )
        .subscribe();
    this.routeQueryParamsSubscription = this.route.queryParams
        .pipe(
            filter((queryParams) => !!queryParams[this.TAB_QUERY_PARAM_KEY]),
            tap((queryParams) => {
              const tabQueryParam = queryParams[this.TAB_QUERY_PARAM_KEY];
              if (tabQueryParam === 'expenses') {
                this.activeItem = this.items?.[this.EXPENSE_TAB_INDEX];
              } else if (tabQueryParam === 'custom-splits') {
                this.activeItem = this.items?.[this.CUSTOM_SPLITS_TAB_INDEX];
              } else if (tabQueryParam === 'reports') {
                this.activeItem = this.items?.[this.REPORTS_TAB_INDEX];
              } else if (tabQueryParam === 'people') {
                this.activeItem = this.items?.[this.PEOPLE_TAB_INDEX];
              }
            }),
        )
        .subscribe();
  }

  ngAfterViewInit() {
    if (JSON.parse(localStorage.getItem('manage-first-ledger-tour') ?? 'false')) {
      return;
    }

    this.shepherdService.modal = false;
    this.shepherdService.confirmCancel = false;
    // @ts-expect-error using function to get all Step.StepOptions tour steps
    this.shepherdService.addSteps(this.getTourSteps());
    this.shepherdService.start();
  }

  ngOnDestroy() {
    this.shepherdService.cancel();
    this.routeParamsSubscription?.unsubscribe();
    this.routeQueryParamsSubscription?.unsubscribe();
  }

  loadExpensesForCurrentMonth() {
    this.expensesStore.loadExpensesForProperty(this.propertyId, {
      startDate: this.utilService.formatDate(
          this.utilService.getFirstDayOfMonthForDate(new Date()),
      ),
      endDate: this.utilService.formatDate(
          this.utilService.getLastDayOfMonthForDate(new Date()),
      ),
    });
  }

  loadExpensesForSelectedMonthAndYear($event: Date) {
    this.expensesStore.loadExpensesForProperty(this.propertyId, {
      startDate: this.utilService.formatDate(
          this.utilService.getFirstDayOfMonthForDate($event),
      ),
      endDate: this.utilService.formatDate(
          this.utilService.getLastDayOfMonthForDate($event),
      ),
    });
  }

  onActiveItemChange($event: MenuItem) {
    this.activeItem = $event;
    let tabQueryParam: string = '';
    if ($event.label === this.items?.[this.EXPENSE_TAB_INDEX]?.label) {
      tabQueryParam = 'expenses';
    } else if (
      $event.label === this.items?.[this.CUSTOM_SPLITS_TAB_INDEX]?.label
    ) {
      tabQueryParam = 'custom-splits';
    } else if (
      $event.label === this.items?.[this.REPORTS_TAB_INDEX]?.label
    ) {
      tabQueryParam = 'reports';
    } else if (
      $event.label === this.items?.[this.PEOPLE_TAB_INDEX]?.label
    ) {
      tabQueryParam = 'people';
    }
    this.router
        .navigate([], {
          relativeTo: this.route,
          queryParams: {tab: tabQueryParam},
        })
        .catch(RouterUtils.navigateCatchErrorCallback);
    this.isInitialLoad.asObservable().pipe(
        take(1),
        tap((isInitialLoad) => {
          if (isInitialLoad) {
            this.isInitialLoad.next(false);
            return;
          }
          if ($event.label === this.items?.[this.EXPENSE_TAB_INDEX]?.label) {
            this.router
                .navigate([], {
                  relativeTo: this.route,
                  queryParams: {tab: 'expenses'},
                })
                .catch(RouterUtils.navigateCatchErrorCallback);
            this.loadExpensesForCurrentMonth();
          } else if (
            $event.label === this.items?.[this.CUSTOM_SPLITS_TAB_INDEX]?.label
          ) {
            this.router
                .navigate([], {
                  relativeTo: this.route,
                  queryParams: {tab: 'custom-splits'},
                })
                .catch(RouterUtils.navigateCatchErrorCallback);
          } else if (
            $event.label === this.items?.[this.REPORTS_TAB_INDEX]?.label
          ) {
            this.router
                .navigate([], {
                  relativeTo: this.route,
                  queryParams: {tab: 'reports'},
                })
                .catch(RouterUtils.navigateCatchErrorCallback);
            this.loadExpensesForCurrentMonth();
            this.resetReportsTabComponent();
          } else if (
            $event.label === this.items?.[this.PEOPLE_TAB_INDEX]?.label
          ) {
            this.router
                .navigate([], {
                  relativeTo: this.route,
                  queryParams: {tab: 'people'},
                })
                .catch(RouterUtils.navigateCatchErrorCallback);
          }
        }),
    );
  }

  getPropertyTier() {
    return this.propertiesStore.propertyById().creatorPaymentStatus.status ===
      'UNPAID' ?
      'Basic Tier' :
      'Premium Tier';
  }

  private resetReportsTabComponent() {
    this.date.setValue(new Date());
  }

  private getTourSteps() {
    const expensesTabElement = document.querySelector('.tab-class-expenses') as HTMLElement;
    const customSplitsTabElement = document.querySelector('.tab-class-custom-splits') as HTMLElement;
    const reportsTabElement = document.querySelector('.tab-class-reports') as HTMLElement;
    const peopleTabElement = document.querySelector('.tab-class-people') as HTMLElement;
    if (!expensesTabElement || !customSplitsTabElement || !reportsTabElement || !peopleTabElement) {
      return [];
    }
    return [{
      id: 'expenses-tab',
      arrow: true,
      title: 'Expenses Tab',
      text: 'View, Create, Approve, Dispute, and Comment on Expenses in this tab',
      buttons: [
        {
          text: `Don't Show Again`,
          action: () => {
            this.shepherdService.next();
            localStorage.setItem('manage-first-ledger-tour', JSON.stringify(true));
          },
        },
        {
          text: 'Next',
          action: () => this.shepherdService.next(),
        },
      ],
      attachTo: {
        element: expensesTabElement,
        on: 'top-end',
      },
    },
    {
      id: 'custom-splits-tab',
      arrow: true,
      title: 'Custom Splits Tab',
      text: 'This is a premium feature, create custom splits for expenses that are divided unevenly',
      buttons: [
        {
          text: `Don't Show Again`,
          action: () => {
            this.shepherdService.next();
            localStorage.setItem('manage-first-ledger-tour', JSON.stringify(true));
          },
        },
        {
          text: 'Next',
          action: () => this.shepherdService.next(),
        },
      ],
      attachTo: {
        element: customSplitsTabElement,
        on: 'top-end',
      },
    },
    {
      id: 'reports-tab',
      arrow: true,
      title: 'Reports Tab',
      text: 'View reports up to 60 days in the past for free tier, or unlimited history for premium',
      buttons: [
        {
          text: `Don't Show Again`,
          action: () => {
            this.shepherdService.next();
            localStorage.setItem('manage-first-ledger-tour', JSON.stringify(true));
          },
        },
        {
          text: 'Next',
          action: () => this.shepherdService.next(),
        },
      ],
      attachTo: {
        element: reportsTabElement,
        on: 'top-end',
      },
    },
    {
      id: 'people-tab',
      arrow: true,
      title: 'People Tab',
      text: `View people's profile data such as IBAN for convenient copy & paste for bank transfers, if you're an admin you can invite or remove people`,
      buttons: [
        {
          text: `Don't Show Again`,
          action: () => {
            this.shepherdService.next();
            localStorage.setItem('manage-first-ledger-tour', JSON.stringify(true));
          },
        },
        {
          text: 'Close',
          action: () => this.shepherdService.next(),
        },
      ],
      attachTo: {
        element: peopleTabElement,
        on: 'top-end',
      },
    }];
  }
}
