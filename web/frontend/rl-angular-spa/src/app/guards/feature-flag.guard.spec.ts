import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {featureFlagGuard} from './feature-flag.guard';

describe('featureFlagGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => featureFlagGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

