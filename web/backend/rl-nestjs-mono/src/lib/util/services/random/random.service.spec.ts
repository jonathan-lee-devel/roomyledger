import {TestBed} from '@suites/unit';

import {RandomService} from './random.service';

describe('RandomService', () => {
  let service: RandomService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(RandomService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
