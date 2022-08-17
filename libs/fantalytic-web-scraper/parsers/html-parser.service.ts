import { writeFileSync } from 'fs';
import { parseQBResponse } from "./qb-parser.service";
import { logError } from "../messaging/error.service";
import { parseRBResponse } from "./rb-parser.service";
import { parseWRTEResponse } from './wr-te-parser.service';
import { PositionTypes } from '../../fantalytic-shared/src/lib/models/fantalytic.interface';

export async function parserHtmlString(html: any, type: PositionTypes, year: string, url: string = ''): Promise<any> {
    
    switch (type.toUpperCase()) {
        case PositionTypes.QB:
            const qbStats = await parseQBResponse(html, url);
            const qbOutputPath = `${__dirname}/../output/${year}_qb.json`;
            try {
                await writeFileSync(qbOutputPath, JSON.stringify(qbStats));
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        case PositionTypes.RB:
            const rbStats = await parseRBResponse(html, url);
            const rbOutputPath = `${__dirname}/../output/${year}_rb.json`;
            try {
                await writeFileSync(rbOutputPath, JSON.stringify(rbStats));
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        case PositionTypes.WR:
        case PositionTypes.TE:
            const wrTeStats = await parseWRTEResponse(html, url);
            const wrTeOutputPath = `${__dirname}/../output/${year}_wr_te.json`;
            try {
                await writeFileSync(wrTeOutputPath, JSON.stringify(wrTeStats));
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        default:
            break;
    }


    return Promise.resolve();
}