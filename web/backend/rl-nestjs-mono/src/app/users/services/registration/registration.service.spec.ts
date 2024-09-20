import {TestBed} from '@automock/jest';

import {RegistrationService} from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(async () => {
    const {unit} = TestBed.create(RegistrationService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
