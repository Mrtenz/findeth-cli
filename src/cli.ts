import { Command } from 'commander';

export const DERIVATION_PATH_REGEX = /m\/44'\/([0-9]+)'\/([0-9]+)'\/([0-9]+)(?:\/([0-9]+))?/;

interface CLIOptions {
  start: string;
  address: string;
  mnemonic: string;
  passphrase: string;
  depth: number;
}

/**
 * Parse a string as number. Throws an error if the string is not a number.
 *
 * @param {string} input
 * @return {number}
 */
const parseNumber = (input: string): number => {
  const value = parseInt(input, 10);
  if (isNaN(value)) {
    throw new Error('Invalid number provided');
  }

  return value;
};

/**
 * Read options from the CLI.
 *
 * @param {string[]} args
 * @return {Command & CLIOptions}
 */
export const cli = (args: string[]): Command & CLIOptions => {
  const program = new Command();

  program
    .requiredOption('--start <path>', 'path to start at', DERIVATION_PATH_REGEX)
    .requiredOption('--address <address>', 'address to search for')
    .requiredOption('--mnemonic <mnemonic>', 'mnemonic phrase')
    .requiredOption('--depth <number>', 'maximum search depth', parseNumber)
    .option('--passphrase [passphrase]', 'optional passphrase for the mnemonic phrase');

  program.parse(args);

  return (program as any) as Command & CLIOptions;
};
