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
