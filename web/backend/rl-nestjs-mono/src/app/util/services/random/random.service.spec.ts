import {TestBed} from '@automock/jest';

import {RandomService} from './random.service';

describe('RandomService', () => {
  let service: RandomService;

  beforeEach(async () => {
    const {unit} = TestBed.create(RandomService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
