import {TestBed} from '@suites/unit';

import {InvitationsEventsHandlerService} from './invitations-events-handler.service';

describe('InvitationsEventsHandlerService', () => {
  let service: InvitationsEventsHandlerService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(
      InvitationsEventsHandlerService,
    ).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
