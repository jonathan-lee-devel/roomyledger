import {TestBed} from '@automock/jest';

import {InvitationsEventsHandlerService} from './invitations-events-handler.service';

describe('InvitationsEventsHandlerService', () => {
  let service: InvitationsEventsHandlerService;

  beforeEach(async () => {
    const {unit} = TestBed.create(InvitationsEventsHandlerService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
