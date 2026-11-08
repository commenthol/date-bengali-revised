/**
 * @copyright 2018-present commenthol
 * @license MIT
 */
export declare class CalendarBengaliRevised {
    /** @type {number} */
    year: number;
    /** @type {number} */
    month: number;
    /** @type {number} */
    day: number;
    /**
     * @param {number|string} [year] - bengali year
     * @param {number|string} [month] - (int) 1...12
     * @param {number|string} [day] - 1...31
     */
    constructor(year?: number | string, month?: number | string, day?: number | string);
    /**
     * convert gregorian date to bengali calendar date
     * @param {number} year - (int) year in Gregorian Calendar
     * @param {number} month - (int)
     * @param {number} day - (int)
     * @returns {this}
     */
    fromGregorian(year: number, month: number, day: number): this;
    /**
     * convert date to bengali calendar date
     * @param {Date} date - javascript date object - uses local date
     * @returns {this}
     */
    fromDate(date: Date): this;
    /**
     * convert bengali date to gregorian date
     * @returns {{ year: number, month: number, day: number }} date in gregorian (preleptic) calendar
     */
    toGregorian(): {
        year: number;
        month: number;
        day: number;
    };
    /**
     * convert bengali date to Date
     * @return {Date} javascript date object in gregorian (preleptic) calendar
     */
    toDate(): Date;
    /**
     * format date in bengali
     * @param {string} [formatStr] - string formatter
     *
     * | Input | Description  |
     * | ----- | ------------ |
     * | Y     | Year with any number of digits and sign |
     * | Q     | Season Name  |
     * | M     | Month number |
     * | MMMM  | Month name   |
     * | D     | Day of month |
     * | dddd  | Day name     |
     *
     * @return {string}
     */
    format(formatStr?: string): string;
}
export default CalendarBengaliRevised;
