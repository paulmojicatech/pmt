import { PositionTypes } from "../../fantalytic-shared/src/lib/models/fantalytic.interface";
import { FantalyticCommand } from "../models/index";
import { GetLocationType, IFantalyticGetCommand, RootCommandTypes } from "../models/parser.interface";

export class CommandParser {
    constructor() { }

    getCommand(args: string[]): FantalyticCommand | null {
        const type = args[2] as RootCommandTypes;
        if (!!type) {
            switch (type.toLowerCase()) {
                case RootCommandTypes.GET:
                    let command = this.parseOptions(type, args) as IFantalyticGetCommand;
                    if (!command.year) {
                        throw('A year must be specified');
                    }
                    command = {
                        ...command,
                        type: RootCommandTypes.GET,
                        year: command.year,
                        week: command.week,
                        location: command.location ?? GetLocationType.FILE,
                        pos: args[3] as PositionTypes
                    };
                    return command;
                default:
                    return null;
            }
        } 
        return null;
    }

    getCommandPostion(type: string): PositionTypes | null {
        if (!!type) {
            switch (type.toLowerCase()) {
                case 'qb':
                    return PositionTypes.QB;
                case 'rb':
                    return PositionTypes.RB;
                case 'wr':
                case 'te':
                    return PositionTypes.WR;
                case 'def_rush':
                    return PositionTypes.DEF_RUSH;
                case 'def_pass':
                    return PositionTypes.DEF_PASS;
                default:
                    return PositionTypes.UNKNOWN;
            }
        }
        return null;
    }

    private parseOptions(cmdType: RootCommandTypes, options: string[]): FantalyticCommand | null {
        switch (cmdType) {
            case RootCommandTypes.GET:
                let getCommand: any = {};
                options.forEach((opt, index) => {
                    switch (opt) {
                        case 'location':
                            getCommand['location'] = options[index + 1] as GetLocationType;
                            break;
                        case 'year':
                            getCommand['year'] = `${options[index + 1]}`;
                        case 'week':
                            getCommand['week'] = `${options[index + 1]}`;
                        default:
                            break;
                    }
                });
                return getCommand;
            default:
                return null;
        }
    }
    
}