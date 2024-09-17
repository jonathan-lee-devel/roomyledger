import {TestBed} from '@automock/jest';

import {PropertyInvitationsController} from './property-invitations.controller';

describe('PropertyInvitationsController', () => {
  let controller: PropertyInvitationsController;

  beforeEach(async () => {
    const {unit} = TestBed.create(PropertyInvitationsController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
