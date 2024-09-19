import {TestBed} from '@automock/jest';

import {EventsGateway} from './events.gateway';

describe('EventsGateway', () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const {unit} = TestBed.create(EventsGateway).compile();
    gateway = unit;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
