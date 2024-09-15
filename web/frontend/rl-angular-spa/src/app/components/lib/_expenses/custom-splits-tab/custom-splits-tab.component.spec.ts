import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSplitsTabComponent } from './custom-splits-tab.component';

describe('CustomSplitsTabComponent', () => {
  let component: CustomSplitsTabComponent;
  let fixture: ComponentFixture<CustomSplitsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSplitsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSplitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
