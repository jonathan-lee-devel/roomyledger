export class UserCheckInEvent {
  static readonly eventIdentifier: string = 'user.checkin';

  constructor(
    public readonly email: string,
    public readonly displayName?: string,
  ) {}
}
