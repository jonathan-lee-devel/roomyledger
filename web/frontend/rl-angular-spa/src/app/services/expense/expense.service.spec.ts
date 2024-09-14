import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {firstValueFrom} from 'rxjs';

import {ExpenseService} from './expense.service';
import {environment} from '../../../environments/environment';
import {CreateExpenseRequestDto} from '../../dtos/expenses/CreateExpenseRequestDto';
import {ExpenseDto} from '../../dtos/expenses/ExpenseDto';


describe('ExpenseService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([ExpenseService], (service: ExpenseService) => {
    expect(service).toBeTruthy();
  }));

  it('should create expense via HTTP', inject([ExpenseService], async (service: ExpenseService) => {
    const createExpenseDto: CreateExpenseRequestDto = {
      amount: 0.00,
      currencyCode: 'USD',
      name: 'Test',
      description: 'Test',
      propertyId: '12345',
    };
    const expenseDto: ExpenseDto = {
      id: '12345',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: 'Test',
      description: 'Test',
      amount: 0.00,
      propertyId: '12345',
      createdByUserId: '12345',
      state: 'PENDING',
      currency: 'USD',
      comments: [],
      approvals: [],
      disputes: [],
      createdBy: {
        id: '12345',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        email: 'test@test.com',
        profile: {
          email: 'test@test.com',
          displayName: 'Test',
        },
        userProfileId: '12345',
      },
    };

    const response$ = service.createExpense(createExpenseDto);
    const responsePromise = firstValueFrom(response$);

    const req = httpTestingController.expectOne(`${environment.EXPENSES_SERVICE_BASE_URL}/`);
    expect(req.request.method).toBe('POST');
    req.flush(expenseDto);

    expect(await responsePromise).toEqual(expenseDto);
    httpTestingController.verify();
  }));
});
