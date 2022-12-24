import type { Animal, Fruit, Gender } from '../types';

/**
 * Calculates the difference in years from the given date rounded.
 * Value returned is 1 in case the rounding reduces it to 0.
 *
 * @param birthdate The date to be subtracted from current date
 * @returns Number value for the number of years
 */
export const calculateAgeInYears = (birthdate: Date): Number => {
  const today = new Date();
  const differenceInMilliseconds = today.getTime() - birthdate.getTime();

  // The TS/JS version of a Max(x, 1)
  return (
    Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)) || 1
  );
};

/**
 * Comparator function to be used for sorting array of any given type, if the given property exists in both a and b.
 * Error handling to be added.
 * 
 * @param a First operand
 * @param b Second operand
 * @param property Common property for the comparion to be based on
 * @param reverse Ascending order by default, reverse set to true reverses it to descending order
 * @returns 1, 0, or -1 based on the comparison  
 */
export const compareByProperty = (a: any, b: any, property: any, reverse = false): Number => {
  let val = 0;
  if (a[property] < b[property]) {
    val = -1;
  }
  else if (a[property] > b[property]) {
    val = 1;
  }
  else {
    return 0;
  }

  return reverse? val * -1: val;
};

/**
 * Calculates the amount of kilograms of food needed for a given animal for the following month from the current date.
 * 
 * @param animal The Animal instance
 * @returns A number representing the amount of food in kilograms
 */
 export const nextMonthFoodSupply = (animal: Animal): number => {
  const date = new Date();
  let days = 0;

  // No need to handle incrementing the year, January is always 31 days
  if (date.getMonth() === 11) {
    days = 31;
  }
  else {
    days = daysInMonth(date.getMonth() + 2, date.getFullYear()); // +1 because its 1 based, +1 for next month
  }
  return dailyFoodSupply(animal) * days;
};

/**
 * Calculates the amount of food in kilograms for a given Animal instance.
 * 
 * @param animal The Animal instance
 * @returns A number representing the amount of food in kilograms
 */
const dailyFoodSupply = (animal: Animal): number => {
  // Simple base case, no need to delay this check
  if (animal.species == "fish") {
    return 0;
  }

  let amount = (animal.height + animal.weight) / 250;
  const age = calculateAgeInYears(new Date(animal.birthdate));
  if (age >= 20) {
    amount /= 2;
  }
  else if (age < 2) {
    amount *= 2;
  }
  if (animal.favouriteFruit == "cherry") {
    amount += 28;
  }
  if (animal.gender == "male") {
    amount *= 1.2;
  }
  return amount;
};

/**
 * Calculates the number of days in a given month of a given year, taking leap years into account.
 * 
 * @param month 1 <= month <= 12 (not zero based)
 * @param year The calendar year (e.g 2022)
 * @returns The number of days in that month
 */
const daysInMonth = (month: number, year: number): number => {
  if (month == 2) {
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29 : 28;
  }
  if (month <= 7) {
    return (month & 1) ? 31 : 30;
  }
  return (month & 1) ? 30 : 31;
}
