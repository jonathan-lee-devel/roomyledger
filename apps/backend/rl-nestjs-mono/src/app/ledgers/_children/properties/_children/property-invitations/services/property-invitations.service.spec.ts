import {TestBed} from '@automock/jest';

import {PropertyInvitationsService} from './property-invitations.service';

describe('PropertyInvitationsService', () => {
  let service: PropertyInvitationsService;

  beforeEach(async () => {
    const {unit} = TestBed.create(PropertyInvitationsService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
