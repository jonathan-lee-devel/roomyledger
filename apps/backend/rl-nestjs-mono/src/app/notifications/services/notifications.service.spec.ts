import {TestBed} from '@automock/jest';

import {NotificationsService} from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const {unit} = TestBed.create(NotificationsService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
