import {TestBed} from '@suites/unit';

import {PropertyInvitationsService} from './property-invitations.service';

describe('PropertyInvitationsService', () => {
  let service: PropertyInvitationsService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(PropertyInvitationsService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
