import {TestBed} from '@automock/jest';

import {ApplicationMessagesController} from './application-messages.controller';

describe('ApplicationMessagesController', () => {
  let controller: ApplicationMessagesController;

  beforeEach(async () => {
    const {unit} = TestBed.create(ApplicationMessagesController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
