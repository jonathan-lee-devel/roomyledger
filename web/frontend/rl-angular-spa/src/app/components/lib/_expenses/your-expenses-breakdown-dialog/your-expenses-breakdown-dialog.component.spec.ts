import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

import {
  YourExpensesBreakdownDialogComponent,
  YourExpensesBreakdownDialogData,
} from './your-expenses-breakdown-dialog.component';

describe('YourExpensesBreakdownDialogComponent', () => {
  let component: YourExpensesBreakdownDialogComponent;
  let fixture: ComponentFixture<YourExpensesBreakdownDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourExpensesBreakdownDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: <YourExpensesBreakdownDialogData>{
              convertedSelectedTotalExpenseFilters: [],
            },
          },
        },
        {
          provide: MessageService,
          useValue: {},
        },
        {
          provide: ConfirmationService,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourExpensesBreakdownDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
