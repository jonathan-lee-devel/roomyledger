import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SIGNAL, signalSetFn} from '@angular/core/primitives/signals';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

import {CardWithLinkComponent} from './card-with-link.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('CardWithLinkComponent', () => {
  let component: CardWithLinkComponent;
  let fixture: ComponentFixture<CardWithLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithLinkComponent],
      providers: [
        provideRouter([]),
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
    fixture = TestBed.createComponent(CardWithLinkComponent);
    component = fixture.componentInstance;
    signalSetFn(component.cardHeaderText[SIGNAL], 'test');
    signalSetFn(component.cardBodyText[SIGNAL], 'test');
    signalSetFn(component.cardTitle[SIGNAL], 'test');
    signalSetFn(component.cardButtonTargetLink[SIGNAL], 'test');
    signalSetFn(component.cardButtonTargetQueryParams[SIGNAL], undefined);
    signalSetFn(component.cardButtonText[SIGNAL], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
