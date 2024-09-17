import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PremiumFeaturesListComponent} from './premium-features-list.component';

describe('PremiumFeaturesListComponent', () => {
  let component: PremiumFeaturesListComponent;
  let fixture: ComponentFixture<PremiumFeaturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumFeaturesListComponent],
    })
        .compileComponents();

    fixture = TestBed.createComponent(PremiumFeaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
