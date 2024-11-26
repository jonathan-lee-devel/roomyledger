import {TestBed} from '@suites/unit';

import {NotificationsController} from './notifications.controller';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(NotificationsController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
