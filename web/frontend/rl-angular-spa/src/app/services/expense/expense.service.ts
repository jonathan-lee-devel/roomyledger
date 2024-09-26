import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {DateRangeDto} from '../../dtos/date/DateRange.dto';
import {CreateExpenseRequestDto} from '../../dtos/expenses/CreateExpenseRequestDto';
import {ExpenseApprovalDto} from '../../dtos/expenses/ExpenseApproval.dto';
import {ExpenseCommentDto} from '../../dtos/expenses/ExpenseComment.dto';
import {ExpenseDisputeDto} from '../../dtos/expenses/ExpenseDispute.dto';
import {ExpenseDistributionDto} from '../../dtos/expenses/ExpenseDistribution.dto';
import {ExpenseDto} from '../../dtos/expenses/ExpenseDto';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private readonly httpClient: HttpClient) {}

  public createExpense(
      createExpenseRequestDto: CreateExpenseRequestDto,
  ): Observable<ExpenseDto> {
    return this.httpClient.post<ExpenseDto>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/`,
        {...createExpenseRequestDto},
    );
  }

  public getExpensesForProperty(
      propertyId: string,
      dateRange: DateRangeDto,
  ): Observable<{expenses: ExpenseDto[], dateRange: DateRangeDto}> {
    return this.httpClient.get<ExpenseDto[]>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/for-property/${propertyId}?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
    ).pipe(
        map((response) => ({
          expenses: response,
          dateRange,
        })),
    );
  }

  deleteExpenseById(expenseId: string): Observable<ExpenseDto> {
    return this.httpClient.delete<ExpenseDto>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/${expenseId}`,
    );
  }

  approveExpenseById(expenseId: string): Observable<ExpenseApprovalDto> {
    return this.httpClient.post<ExpenseApprovalDto>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/discussions/approvals/for-expense/${expenseId}`,
        {},
    );
  }

  disputeExpenseById(expenseId: string): Observable<ExpenseDisputeDto> {
    return this.httpClient.post<ExpenseDisputeDto>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/discussions/disputes/for-expense/${expenseId}`,
        {},
    );
  }

  addCommentToExpenseById(
      expenseId: string,
      commentText: string,
  ): Observable<ExpenseCommentDto> {
    return this.httpClient.post<ExpenseCommentDto>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/discussions/comments/for-expense/${expenseId}`,
        {text: commentText},
    );
  }

  getExpenseDistributionsForPropertyById(propertyId: string): Observable<ExpenseDistributionDto[]> {
    return this.httpClient.get<ExpenseDistributionDto[]>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/distributions/for-property/${propertyId}`,
    );
  }

  getExpenseById(expenseId: string) {
    return this.httpClient.get<ExpenseDto & {imageUrl?: string}>(
        `${environment.EXPENSES_SERVICE_BASE_URL}/${expenseId}`,
    );
  }
}
