import {HttpErrorResponse} from '@angular/common/http';
import {computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {ConfirmationService} from 'primeng/api';
import {catchError, take, tap, throwError} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {rebaseRoutePathAsString, RoutePath, routePathParameters} from '../../../app.routes';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {
  ExpenseCreateOverlayPanelComponent,
} from '../../../components/lib/_expenses/expense-create-overlay-panel/expense-create-overlay-panel.component';
import {DateRangeDto} from '../../../dtos/date/DateRange.dto';
import {CreateExpenseRequestDto} from '../../../dtos/expenses/CreateExpenseRequestDto';
import {ExpenseDistributionDto} from '../../../dtos/expenses/ExpenseDistribution.dto';
import {ExpenseDto, ExpenseStateEnum, initialExpenseDto} from '../../../dtos/expenses/ExpenseDto';
import {PropertyDto} from '../../../dtos/properties/Property.dto';
import {ExpenseService} from '../../../services/expense/expense.service';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {ToastWrapperService} from '../../../services/toast-wrapper/toast-wrapper.service';
import {RouterUtils} from '../../../util/router/Router.utils';

type ExpenseState = {
  isLoading: boolean;
  expensesForPropertyId: string;
  expensesForPropertyById: ExpenseDto[];
  expensesForPropertyByIdDateRange: DateRangeDto;
  expenseDistributionsForPropertyById: ExpenseDistributionDto[];
  expenseId: string;
  expenseById: ExpenseDto;
};

const initialState: ExpenseState = {
  isLoading: false,
  expensesForPropertyId: '',
  expensesForPropertyById: [],
  expensesForPropertyByIdDateRange: {
    startDate: '',
    endDate: '',
  },
  expenseDistributionsForPropertyById: [],
  expenseId: '',
  expenseById: {...initialExpenseDto},
};

export const ExpensesStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    /* PRIVATE NON-EFFECT HELPER METHODS */
    withMethods(() => {
      return {
        _formatExpense: (expense: ExpenseDto) => {
          const formattedAmount = Number(expense.amount).toFixed(2);
          if (expense.currency === 'EUR') {
            return `€ ${formattedAmount}`;
          } else if (expense.currency === 'USD') {
            return `$ ${formattedAmount}`;
          }

          return formattedAmount;
        },
        _getTotalPerTenant: (expense: ExpenseDto, property: PropertyDto) => {
          const numberOfTenants = property.tenants.length;
          return expense.amount / numberOfTenants;
        },
        _formatTotal: (expenses: ExpenseDto[], total: number) => {
          let currencyCode = 'EUR';
          if (expenses.length > 0) {
            currencyCode = expenses[0].currency;
          }
          const amount = total.toFixed(2);
          return currencyCode === 'EUR' ? `€ ${amount}` : `$ ${amount}`;
        },
      };
    }),
    /* PRIVATE EFFECT HELPER METHODS */
    withMethods(() => {
      const toastWrapperService = inject(ToastWrapperService);
      const router = inject(Router);
      return {
        _onSuccessfulExpenseCreation: (expense: ExpenseDto) => {
          toastWrapperService.showToast(
              'Expense Created',
              `Expense with name: ${expense.name} has successfully been created`,
              false,
              true,
              'info',
              10_000,
          );
          router
              .navigate([
                rebaseRoutePathAsString(
                    RoutePath.LEDGERS_DASHBOARD_ID.replace(
                        routePathParameters.PROPERTY_ID,
                        expense.propertyId,
                    ),
                ),
              ])
              .catch(RouterUtils.navigateCatchErrorCallback);
        },
        _onSuccessfulExpenseApproval: () => {
          toastWrapperService.showToast(
              'Expense Approved',
              `Expense has successfully been approved`,
              false,
              true,
              'info',
              10_000,
          );
        },
        _onSuccessfulExpenseComment: () => {
          toastWrapperService.showToast(
              'Comment Added',
              'Comment has successfully been added',
              false,
              true,
              'info',
              10_000,
          );
        },
        _onSuccessfulExpenseDispute: () => {
          toastWrapperService.showToast(
              'Expense Disputed',
              'Expense has successfully been disputed',
              false,
              true,
              'info',
              10_000,
          );
        },
      };
    }),
    /* EFFECT METHODS */
    withMethods((store) => {
      const expenseService = inject(ExpenseService);
      const toastWrapperService = inject(ToastWrapperService);
      return {
        loadExpenseById: (expenseId: string) => {
          patchState(store, {isLoading: true});
          expenseService.getExpenseById(expenseId).pipe(
              take(1),
              tap((expense) => {
                patchState(store, {expenseById: {...expense}, isLoading: false});
              }),
          ).subscribe();
        },
        deleteExpenseById: (expenseId: string) => {
          patchState(store, {isLoading: true});
          expenseService.deleteExpenseById(expenseId).pipe(
              take(1),
              tap((deletedExpense) => {
                patchState(store, {
                  expensesForPropertyById: [...store.expensesForPropertyById().filter((expense) => expense.id !== expenseId)],
                  isLoading: false,
                });
                toastWrapperService.showToast(
                    'Expense Deleted',
                    `Expense with name: ${deletedExpense.name} has successfully been deleted`,
                    false,
                    true,
                    'info',
                    environment.TOAST_DURATION_MS,
                );
              }),
          ).subscribe();
        },
      };
    }),
    withMethods((store) => {
      const expenseService = inject(ExpenseService);
      const confirmationService = inject(ConfirmationService);
      const supabaseService = inject(SupabaseService);
      const toastWrapperService = inject(ToastWrapperService);
      return {
        loadExpensesForProperty: (propertyId: string, dateRange: DateRangeDto) => {
          patchState(store, {expensesForPropertyById: [], expensesForPropertyByIdDateRange: dateRange, isLoading: true});
          expenseService.getExpensesForProperty(propertyId, dateRange).pipe(
              take(1),
              tap((response) => {
                patchState(store, {
                  expensesForPropertyId: propertyId,
                  expensesForPropertyByIdDateRange: response.dateRange,
                  expensesForPropertyById: [...response.expenses],
                  isLoading: false,
                });
              }),
          ).subscribe();
        },
        loadExpenseDistributionsForProperty: (propertyId: string) => {
          patchState(store, {expenseDistributionsForPropertyById: [], isLoading: true});
          expenseService.getExpenseDistributionsForPropertyById(propertyId).pipe(
              take(1),
              tap((expenseDistributions) => {
                patchState(store, {
                  expenseDistributionsForPropertyById: [...expenseDistributions],
                  isLoading: false,
                });
              }),
          ).subscribe();
        },
        addExpense: async (createExpenseRequestDto: CreateExpenseRequestDto, component: ExpenseCreateOverlayPanelComponent) => {
          patchState(store, {isLoading: true});
          let uploadResponse: {id: string, path: string, fullPath: string} | null = null;
          if (createExpenseRequestDto.uploadedFile) {
            const {data, error} = await supabaseService.uploadPhoto(
                SupabaseService.expenseProofImagesBucketName,
                createExpenseRequestDto.uploadedFile,
            );
            uploadResponse = data;
            if (error) {
              console.error(error);
              toastWrapperService.showToast('Upload Failed', 'File could not be uploaded', false, true, 'error', 5000);
              return;
            }
            toastWrapperService.showToast('Upload Successful', 'File was uploaded successfully', false, true, 'success', 5000);
          }
          delete createExpenseRequestDto.uploadedFile;
          expenseService.createExpense({...createExpenseRequestDto, filePath: uploadResponse?.fullPath}).pipe(
              take(1),
              catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === HttpStatus.BAD_REQUEST) {
                  patchState(store, {isLoading: false});
                }
                return throwError(() => err);
              }),
              tap((createdExpense) => {
                patchState(store, {
                  expensesForPropertyById: [...store.expensesForPropertyById(), {...createdExpense}],
                  isLoading: false,
                });
                component.clearForm();
                store._onSuccessfulExpenseCreation(createdExpense);
              }),
          ).subscribe();
        },
        updateExpenseById: (expenseId: string) => {
          patchState(store, {
            expenseId,
            expenseById: {
              ...store.expensesForPropertyById().find((expense) => expense.id === expenseId) ?? initialExpenseDto},
          });
        },
        commentOnExpense: (expenseId: string, commentText: string) => {
          patchState(store, {isLoading: true});
          expenseService.addCommentToExpenseById(expenseId, commentText).pipe(
              take(1),
              tap((createdComment) => {
                patchState(store, {
                  expenseById: {
                    ...store.expenseById(),
                    comments: [
                      ...store.expenseById().comments,
                      {...createdComment},
                    ],
                  },
                  expensesForPropertyById: [
                    ...store.expensesForPropertyById()
                        .map((expense) => {
                          return expense.id === createdComment.expenseId ?
                        {
                          ...expense,
                          comments: [
                            ...expense.comments,
                            {...createdComment},
                          ],
                        } : expense;
                        }),
                  ],
                  isLoading: false});
                store._onSuccessfulExpenseComment();
              }),
          ).subscribe();
        },
        promptDeleteExpenseById: (expenseId: string) => {
          const expense = store.expensesForPropertyById()
              .find((expense) => expense.id === expenseId);
          if (!expense) {
            return;
          }
          confirmationService.confirm({
            header: `Delete Expense: ${expense.name} ?`,
            message: `Are you sure you want to delete ${expense.name} ?`,
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'pi pi-trash',
            acceptLabel: '  Delete',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            accept: () => store.deleteExpenseById(expenseId),
          });
        },
      };
    }),
    withMethods((store) => {
      const expenseService = inject(ExpenseService);
      return {
        approveExpense: (expenseId: string) => {
          patchState(store, {isLoading: true});
          expenseService.approveExpenseById(expenseId).pipe(
              take(1),
              tap(() => {
                patchState(store, {isLoading: true});
                store._onSuccessfulExpenseApproval();
                store.loadExpensesForProperty(store.expensesForPropertyId(), store.expensesForPropertyByIdDateRange());
              }),
          ).subscribe();
        },
        disputeExpense: (expenseId: string) => {
          patchState(store, {isLoading: true});
          expenseService.disputeExpenseById(expenseId).pipe(
              take(1),
              tap(() => {
                store._onSuccessfulExpenseDispute();
                store.loadExpensesForProperty(store.expensesForPropertyId(), store.expensesForPropertyByIdDateRange());
              }),
          ).subscribe();
        },
      };
    }),
    /* COMPUTED */
    withComputed((store) => {
      return {
        approvedExpenses: computed(() => store.expensesForPropertyById()
            .filter((expense) =>
              expense.state === 'APPROVED',
            )),
        disputedExpenses: computed(() => store.expensesForPropertyById()
            .filter((expense) =>
              expense.state === 'DISPUTED',
            )),
        pendingExpenses: computed(() => store.expensesForPropertyById()
            .filter((expense) =>
              expense.state === 'PENDING',
            )),
        dateRange: computed(() => store.expensesForPropertyByIdDateRange()),
        distributions: computed(() => store.expenseDistributionsForPropertyById()),
      };
    }),
    /* SELECTOR METHODS */
    withMethods((store) => {
      return {
        getExpenseById: (expenseId: string) => store.expensesForPropertyById().find((expense) => expense.id === expenseId),
        getStateFilteredTotalExpensesAmount: (expenseStates: ExpenseStateEnum[]) => {
          const filteredExpenses = store.expensesForPropertyById()
              .filter((expense) => expenseStates.includes(expense.state));
          const total = filteredExpenses
              .reduce(
                  (total, expense) => total + Number(expense.amount), 0,
              );
          return store._formatTotal(filteredExpenses, Number(total));
        },
        getStateFilteredExpensesTotalAmount: (expenseStates: ExpenseStateEnum[]) =>
          store.expensesForPropertyById()
              .filter((expense) => expenseStates.includes(expense.state))
              .map((filteredExpense) => (<ExpenseDto & {formattedAmount: string}>{
                ...filteredExpense,
                formattedAmount: store._formatExpense(filteredExpense),
              })),
        getStateFilteredExpensesAmountPerTenant: (property: PropertyDto, expenseStates: ExpenseStateEnum[]) =>
          store.expensesForPropertyById()
              .filter((expense) => expenseStates.includes(expense.state))
              .map((filteredExpense) => (<ExpenseDto & {formattedAmount: string}>{
                ...filteredExpense,
                formattedTotal: store._formatExpense({
                  ...filteredExpense,
                }),
                amount: store._getTotalPerTenant(filteredExpense, property),
                formattedAmount: store._formatExpense({
                  ...filteredExpense,
                  amount: store._getTotalPerTenant(filteredExpense, property),
                }),
              })),
        getStateFilteredExpensesAmountPerTenantTotal: (property: PropertyDto, expenseStates: ExpenseStateEnum[]) => {
          const expenses = store.expensesForPropertyById()
              .filter((expense) => expenseStates.includes(expense.state))
              .map((filteredExpense) => (<ExpenseDto & {formattedAmount: string}>{
                ...filteredExpense,
                amount: store._getTotalPerTenant(filteredExpense, property),
                formattedAmount: store._formatExpense({
                  ...filteredExpense,
                  amount: store._getTotalPerTenant(filteredExpense, property),
                }),
              }));
          const total = expenses
              .reduce(
                  (total, expense) => total + Number(expense.amount), 0,
              );
          return store._formatTotal(expenses, Number(total));
        },
        getUserExpenseVoteStateById: (expenseId: string, userEmail: string): ExpenseStateEnum => {
          const expense = store.expensesForPropertyById().find((expense) => expense.id === expenseId);
          if (!expense?.approvals || !expense?.disputes) {
            return 'PENDING';
          }
          if (expense.approvals
              .map((approval) => approval.createdBy.email)
              .includes(userEmail)) {
            return 'APPROVED';
          }
          if (expense.disputes
              .map((dispute) => dispute.createdBy.email)
              .includes(userEmail)) {
            return 'DISPUTED';
          }
          return 'PENDING';
        },
      };
    }),
);
