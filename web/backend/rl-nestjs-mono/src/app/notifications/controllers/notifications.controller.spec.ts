import {TestBed} from '@automock/jest';

import {NotificationsController} from './notifications.controller';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const {unit} = TestBed.create(NotificationsController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
