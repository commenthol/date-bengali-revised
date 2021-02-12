declare module 'date-bengali-revised' {
  export interface GregorianDate {
    year: number;
    month: number;
    day: number;
  }

  export class CalendarBengaliRevised {
    constructor();

    fromGregorian(year: number, month: number, day: number): this;

    fromDate(date: Date): this;

    toGregorian(): GregorianDate;

    toDate(): Date;

    format(formatStr: string): string;
  }

  export default CalendarBengaliRevised;
}
