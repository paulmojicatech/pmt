import { logHelpMessage } from "../messaging/success.service";
import { CommandTypes, RootCommandTypes } from "../models/parser.interface";

export function logHelp(commands: string[]): void {
    const numberOfCommands = commands.length;

    switch (numberOfCommands) {
        case 2:
            // command type
            logHelpMessage(CommandTypes.ROOT);
            break;
        default:
            break;
    }

    // get -> position
    // opt: position -> position type
    // opt: week -> 1 - 17
    // opt: season -> year
}