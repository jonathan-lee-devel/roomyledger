import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PropertiesManageComponent} from './properties-manage.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('PropertiesManageComponent', () => {
  let component: PropertiesManageComponent;
  let fixture: ComponentFixture<PropertiesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesManageComponent],
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
    fixture = TestBed.createComponent(PropertiesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
