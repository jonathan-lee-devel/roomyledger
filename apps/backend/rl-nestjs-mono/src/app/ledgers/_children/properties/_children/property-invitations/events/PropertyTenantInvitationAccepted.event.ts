export class PropertyTenantInvitationAcceptedEvent {
  static readonly eventIdentifier: string =
    'property.tenant.invitation.accepted';

  constructor(
    public readonly email: string,
    public readonly propertyInvitationTokenValue: string,
  ) {}
}
