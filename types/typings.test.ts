import { CalendarBengaliRevised } from 'date-bengali-revised';

const cal = new CalendarBengaliRevised(); // $ExpectType CalendarBengaliRevised
cal.fromGregorian(1, 1, 2010); // $ExpectType CalendarBengaliRevised
cal.toDate(); // $ExpectType Date
cal.format('Y'); // $ExpectType string
