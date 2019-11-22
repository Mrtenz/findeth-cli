/**
 * Check if array `a` and `b` are equal. This does not do deep comparison.
 *
 * @param a
 * @param b
 */
const isEqual = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  return !a.some((item, index) => item !== b[index]);
};

/**
 * Increment an array, one number at a time. For example, if an array has a length of 3, and the maximum is 2, the array
 * will be incremented like this:
 *
 * [0, 0, 0]
 * [1, 0, 0]
 * [2, 0, 0]
 * [0, 1, 0]
 * ...
 * [2, 2, 2]
 *
 *
 * @param array
 * @param maximum
 * @param digit
 */
const increment = (array: number[], maximum: number, digit: number = 0): number[] => {
  array[digit] = array[digit] + 1;
  array[digit] = array[digit] % (maximum + 1);

  if (array[digit] === 0) {
    return increment(array, maximum, digit + 1);
  }

  return array;
};

/**
 * Get all arrays with `length` from 0 to `maximum`.
 *
 * @param {number[]} start
 * @param {number} maximum
 * @return {IterableIterator<number[]>}
 */
export function* getArrays(start: number[], maximum: number): IterableIterator<number[]> {
  let array = [...start];
  const maximumArray = new Array(array.length).fill(maximum);

  while (!isEqual(array, maximumArray)) {
    array = increment(array, maximum);
    yield array;
  }
}
