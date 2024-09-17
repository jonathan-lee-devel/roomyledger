import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SIGNAL, signalSetFn} from '@angular/core/primitives/signals';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

import {ExpenseActionMenuComponent} from './expense-action-menu.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('ExpenseActionMenuComponent', () => {
  let component: ExpenseActionMenuComponent;
  let fixture: ComponentFixture<ExpenseActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseActionMenuComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MessageService,
          useValue: {},
        },
        {
          provide: ConfirmationService,
          useValue: {},
        },
        {
          provide: DialogService,
          useValue: {},
        },
        {
          provide: Document,
          useClass: MockDocument,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseActionMenuComponent);
    component = fixture.componentInstance;
    signalSetFn(component.propertyId[SIGNAL], 'test');
    signalSetFn(component.expenseId[SIGNAL], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
