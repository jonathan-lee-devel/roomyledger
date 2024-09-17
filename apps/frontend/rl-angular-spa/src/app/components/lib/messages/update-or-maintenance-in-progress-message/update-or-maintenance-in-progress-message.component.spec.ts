import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateOrMaintenanceInProgressMessageComponent} from './update-or-maintenance-in-progress-message.component';

describe('UpdateOrMaintenanceInProgressMessageComponent', () => {
  let component: UpdateOrMaintenanceInProgressMessageComponent;
  let fixture: ComponentFixture<UpdateOrMaintenanceInProgressMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrMaintenanceInProgressMessageComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrMaintenanceInProgressMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
