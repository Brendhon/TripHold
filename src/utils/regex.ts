// Email regex 
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// Password regex - Minimum six characters
export const passwordRegex = /^.{6,}$/;

// Function to test regex
export const testRegex = (regex: RegExp, value: string | number) => {
  return !value ? false : !regex.test(value.toString())
}