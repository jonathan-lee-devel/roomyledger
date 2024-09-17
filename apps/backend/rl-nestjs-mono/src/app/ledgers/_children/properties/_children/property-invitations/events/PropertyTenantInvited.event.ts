export class PropertyTenantInvitedEvent {
  static readonly eventIdentifier: string = 'property.tenant.invited';

  constructor(
    public readonly email: string,
    public readonly propertyId: string,
    public readonly inviterDisplayName: string,
    public readonly propertyInvitationTokenValue: string,
  ) {}
}
