import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutInProgressComponent} from './logout-in-progress.component';

describe('LogoutInProgressComponent', () => {
  let component: LogoutInProgressComponent;
  let fixture: ComponentFixture<LogoutInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutInProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
