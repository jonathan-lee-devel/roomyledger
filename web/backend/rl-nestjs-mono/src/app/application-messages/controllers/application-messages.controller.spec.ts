import {TestBed} from '@suites/unit';

import {ApplicationMessagesController} from './application-messages.controller';

describe('ApplicationMessagesController', () => {
  let controller: ApplicationMessagesController;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(
      ApplicationMessagesController,
    ).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
