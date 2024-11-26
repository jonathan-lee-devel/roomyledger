import {faker} from '@faker-js/faker';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';
import {AuthUser} from '@supabase/supabase-js';

import {PropertyInvitationsController} from './property-invitations.controller';
import {PropertyInvitationsService} from '../services/property-invitations.service';

describe('PropertyInvitationsController', () => {
  let controller: PropertyInvitationsController;
  let mockPropertyInvitationsService: Mocked<PropertyInvitationsService>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(
      PropertyInvitationsController,
    ).compile();
    controller = unit;

    mockPropertyInvitationsService = unitRef.get<PropertyInvitationsService>(
      PropertyInvitationsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockPropertyInvitationsService).toBeDefined();
  });

  it('should create a property invitation', async () => {
    const currentUserEmail = faker.internet.email();
    const currentUserName = faker.internet.displayName();
    const id = faker.string.uuid();
    const email = faker.internet.email();

    mockPropertyInvitationsService.inviteTenantToProperty.mockResolvedValue({
      status: 'success',
    } as never);

    const result = await controller.createPropertyInvitation(
      {
        email: currentUserEmail,
        user_metadata: {name: currentUserName},
      } as unknown as AuthUser,
      {id},
      {email},
    );

    expect(
      mockPropertyInvitationsService.inviteTenantToProperty,
    ).toHaveBeenCalledWith(
      currentUserEmail.toLowerCase(),
      currentUserName,
      id,
      email.toLowerCase(),
    );
    expect(result).toStrictEqual({status: 'success'});
  });

  it('should accept a property invitation', async () => {
    const currentUserEmail = faker.internet.email();
    const id = faker.string.uuid();
    const tokenValue = faker.string.uuid();

    mockPropertyInvitationsService.acceptInvitationToProperty.mockResolvedValue(
      {status: 'success'} as never,
    );

    const result = await controller.acceptInvitation(
      {email: currentUserEmail} as AuthUser,
      {id},
      {tokenValue},
    );

    expect(
      mockPropertyInvitationsService.acceptInvitationToProperty,
    ).toHaveBeenCalledWith(currentUserEmail.toLowerCase(), id, tokenValue);
    expect(result).toStrictEqual({status: 'success'});
  });
});
