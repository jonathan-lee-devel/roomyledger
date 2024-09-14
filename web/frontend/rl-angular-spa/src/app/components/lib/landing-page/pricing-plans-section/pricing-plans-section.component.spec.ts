import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PricingPlansSectionComponent} from './pricing-plans-section.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('PricingPlansSectionComponent', () => {
  let component: PricingPlansSectionComponent;
  let fixture: ComponentFixture<PricingPlansSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPlansSectionComponent],
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
          provide: Document,
          useClass: MockDocument,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPlansSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
