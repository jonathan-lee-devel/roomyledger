import {TestBed} from '@suites/unit';

import {RegistrationService} from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(RegistrationService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
