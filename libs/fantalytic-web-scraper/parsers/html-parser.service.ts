import { writeFileSync } from 'fs';
import { parseQBResponse } from "./qb-parser.service";
import { logError } from "../messaging/error.service";
import { parseRBResponse } from "./rb-parser.service";
import { parseWRTEResponse } from './wr-te-parser.service';
import { PositionTypes } from '../../fantalytic-shared/src/lib/models/fantalytic.interface';
import { parseDefPassResponse, parseDefRushResponse } from './def-parser.service';
import { parseQBStats, parseRbStats, parseRecevingStats } from '../../fantalytic-shared/src';

const axios = require('axios');

export async function parserHtmlString(html: any, type: PositionTypes, year: string, week: number, isUpload: boolean, url: string = ''): Promise<any> {
    switch (type.toUpperCase()) {        
        case PositionTypes.QB: {
            const qbStats = await parseQBResponse(html, url);
            const parsedQbStats = parseQBStats(qbStats, +year, week);
            const qbOutputPath = `${__dirname}/../output/${year}_qb.json`;
            try {
                if (!isUpload) {
                    await writeFileSync(qbOutputPath, JSON.stringify(parsedQbStats));
                } else {
                    const body = {qbs: parsedQbStats};
                    await axios.post('https://fantalytic.io/api/qb', body);
                }
                
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        }
        case PositionTypes.RB: {
            const rbStats = await parseRBResponse(html, url);
            const parsedRbStats = parseRbStats(rbStats, +year, week);
            const rbOutputPath = `${__dirname}/../output/${year}_rb.json`;
            try {
                if (!isUpload) {
                    await writeFileSync(rbOutputPath, JSON.stringify(parsedRbStats));
                } else {
                    const body = {rbs: parsedRbStats};
                    await axios.post('https://fantalytic.io/api/rb', body);
                }
                
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        }
        case PositionTypes.WR:
        case PositionTypes.TE: {
            const wrTeStats = await parseWRTEResponse(html, url);
            const parsedRecStats = parseRecevingStats(wrTeStats, +year, week);
            const wrTeOutputPath = `${__dirname}/../output/${year}_wr_te.json`;
            try {
                if (!isUpload) {
                    await writeFileSync(wrTeOutputPath, JSON.stringify(parsedRecStats));
                } else {
                    const body = {receivers: parsedRecStats};
                    await axios.post('https://fantalytic.io/api/wr_te', body);
                }
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        }
        case PositionTypes.DEF_RUSH:
            const defRushStats = await parseDefRushResponse(html, url);
            const defRushOutputPath = `${__dirname}/../output/${year}_def_rush.json`;
            try {
                await writeFileSync(defRushOutputPath, JSON.stringify(defRushStats));
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        case PositionTypes.DEF_PASS:
            const defPassStats = await parseDefPassResponse(html, url);
            const defPassOutputPath = `${__dirname}/../output/${year}_def_pass.json`;
            try {
                await writeFileSync(defPassOutputPath, JSON.stringify(defPassStats));
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        default:
            break;
    }
    return Promise.resolve();
}