import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MessageService} from 'primeng/api';

import {FreeTrialMessageComponent} from './free-trial-message.component';

describe('FreeTrialMessageComponent', () => {
  let component: FreeTrialMessageComponent;
  let fixture: ComponentFixture<FreeTrialMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeTrialMessageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MessageService,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTrialMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
