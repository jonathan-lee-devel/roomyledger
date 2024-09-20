import {DateTime} from 'luxon';

export class DateRangeDto {
  startDate: DateTime;
  endDate: DateTime;

  constructor(startDate: string, endDate: string) {
    this.startDate = DateTime.fromISO(startDate);
    this.endDate = DateTime.fromISO(endDate);
  }
}
