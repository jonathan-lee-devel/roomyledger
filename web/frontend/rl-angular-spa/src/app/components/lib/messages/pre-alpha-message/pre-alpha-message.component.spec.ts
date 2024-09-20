import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';

import {PreAlphaMessageComponent} from './pre-alpha-message.component';

describe('PreAlphaMessageComponent', () => {
  let component: PreAlphaMessageComponent;
  let fixture: ComponentFixture<PreAlphaMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreAlphaMessageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAlphaMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
