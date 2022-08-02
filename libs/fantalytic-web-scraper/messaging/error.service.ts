import * as chalk from 'chalk';

export function logError(errorMsg: string): void {
    console.log(chalk.default.red(`Error parsing command: ${errorMsg}.  Type --help for valid commands`));
}