import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ComponentsAndFeaturesSectionComponent} from './components-and-features-section.component';

describe('ComponentsAndFeaturesSectionComponent', () => {
  let component: ComponentsAndFeaturesSectionComponent;
  let fixture: ComponentFixture<ComponentsAndFeaturesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsAndFeaturesSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsAndFeaturesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
