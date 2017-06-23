/**
 * Create a helper method to strip ',' from amount and return number to 2 decimals
 * @param {String} invalidNumber
 * @return String
 */
export function stripCommas(invalidNumber) {
  if (typeof invalidNumber === 'string') {
    return invalidNumber.replace(new RegExp(',', 'g'), '');
  }
  throw new Error('Input must be a string');
}
