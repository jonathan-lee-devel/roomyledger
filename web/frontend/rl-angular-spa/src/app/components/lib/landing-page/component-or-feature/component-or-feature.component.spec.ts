import {SIGNAL, signalSetFn} from '@angular/core/primitives/signals';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ComponentOrFeatureComponent} from './component-or-feature.component';

describe('ComponentOrFeatureComponent', () => {
  let component: ComponentOrFeatureComponent;
  let fixture: ComponentFixture<ComponentOrFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentOrFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentOrFeatureComponent);
    component = fixture.componentInstance;
    signalSetFn(component.iconClass[SIGNAL], 'test');
    signalSetFn(component.headerText[SIGNAL], 'test');
    signalSetFn(component.subHeaderText[SIGNAL], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
