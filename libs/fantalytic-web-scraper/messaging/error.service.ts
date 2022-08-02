const chalk = require('chalk');

export function logError(errorMsg: string): void {
    console.log(chalk.red(`Error parsing command: ${errorMsg}.  Type --help for valid commands`));
}