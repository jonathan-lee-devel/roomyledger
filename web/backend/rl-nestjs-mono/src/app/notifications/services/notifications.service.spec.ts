import {TestBed} from '@suites/unit';

import {NotificationsService} from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(NotificationsService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
