import { HDNode, isValidMnemonic } from '@ethersproject/hdnode';
import ora from 'ora';
import { cli, DERIVATION_PATH_REGEX } from './cli';
import { getArrays } from './utils';

export interface Address {
  path: string;
  address: string;
}

/**
 * Turn a derivation path array into a string.
 *
 * @param {number} coinType
 * @param {number} account
 * @param {number} change
 * @param {number} addressIndex
 * @return {string}
 */
export const arrayToPath = ([coinType, account, change, addressIndex]: number[]): string => {
  return `m/44'/${coinType}'/${account}'/${change}/${addressIndex || 0}`;
};

/**
 * Start searching for the `searchAddress`. If an address is found, it will return the derivation path. Otherwise null
 * is returned.
 *
 * @param {number[]} start
 * @param {number} depth
 * @param {string} mnemonic
 * @param {string} passphrase
 * @param {string} searchAddress
 * @return {Promise<Address | null>}
 */
export const startDerivation = async (
  start: number[],
  depth: number,
  mnemonic: string,
  passphrase: string,
  searchAddress: string
): Promise<Address | null> => {
  const hdNode = HDNode.fromMnemonic(mnemonic, passphrase);
  const iterator = getArrays(start, depth);
  const spinner = ora().start();

  for (const foo of iterator) {
    const path = (spinner.text = arrayToPath(foo));
    const address = hdNode.derivePath(path).address;

    await new Promise(resolve => setTimeout(resolve));

    if (address.toLowerCase() === searchAddress) {
      spinner.succeed('Address found!');
      return { path, address };
    }
  }

  spinner.fail('Address not found');
  return null;
};

/**
 * Parse a derivation path string to an array of numbers.
 *
 * @param {string} path
 * @return {number[]}
 */
export const getStart = (path: string): number[] => {
  const match = DERIVATION_PATH_REGEX.exec(path);
  if (match) {
    const start = match
      .slice(1)
      .filter(part => part !== undefined)
      .map(index => parseInt(index, 10));

    if (!start.some(value => isNaN(value))) {
      return start;
    }
  }

  throw new Error('Invalid starting path');
};

/**
 * Run the application.
 */
export const run = async () => {
  const { start, address, depth, mnemonic, passphrase } = cli(process.argv);

  const startArray = getStart(start);

  if (!isValidMnemonic(mnemonic)) {
    console.error('Invalid mnemonic phrase provided');
    process.exit(1);
  }

  const match = await startDerivation(
    startArray,
    depth,
    mnemonic,
    passphrase,
    address.toLowerCase()
  );

  if (match !== null) {
    console.log();
    console.log('Derivation path: ', match.path);
    console.log();
  }
};
