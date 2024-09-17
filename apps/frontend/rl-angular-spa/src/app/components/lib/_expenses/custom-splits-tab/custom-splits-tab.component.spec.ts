import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {CustomSplitsTabComponent} from './custom-splits-tab.component';

describe('CustomSplitsTabComponent', () => {
  let component: CustomSplitsTabComponent;
  let fixture: ComponentFixture<CustomSplitsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSplitsTabComponent],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSplitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
