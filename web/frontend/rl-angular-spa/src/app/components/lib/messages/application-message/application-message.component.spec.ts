import {SIGNAL, signalSetFn} from '@angular/core/primitives/signals';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';

import {ApplicationMessageComponent} from './application-message.component';

describe('ApplicationMessageComponent', () => {
  let component: ApplicationMessageComponent;
  let fixture: ComponentFixture<ApplicationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationMessageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMessageComponent);
    component = fixture.componentInstance;
    signalSetFn(component.message[SIGNAL], 'test');
    signalSetFn(component.severity[SIGNAL], 'INFO');
    signalSetFn(component.routerLink[SIGNAL], 'test');
    signalSetFn(component.routerLinkText[SIGNAL], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
