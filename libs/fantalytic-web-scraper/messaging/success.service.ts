import { CommandTypes, RootCommandTypes } from "../models/parser.interface";
import { CommandParser } from "../parsers/command-parser.service";
import { logError } from "./error.service";

const chalk = require('chalk');

export function logSuccess(successMsg: string): void {
    console.log(chalk.green(`Success: ${successMsg}`));
}

export function logHelpMessage(commandType: CommandTypes): void {
    switch (commandType) {
        case CommandTypes.ROOT:
            console.log(chalk.blue('Below are the list of valid commands:\r'));
            for (let rootCmd in RootCommandTypes) {
                if (rootCmd.toUpperCase() !== `${RootCommandTypes.UNKNOWN.toUpperCase()}`) {
                    console.log(chalk.yellow(`${rootCmd}\r`));
                }
            }
            console.log(chalk.yellow('For more information, type the command followed by --help'));
            break;
        default:
            logError('Unknown command type');
    }
}