import { writeFileSync } from 'fs';
import { parseDefStats } from '../../fantalytic-shared/src';
import { PositionTypes } from '../../fantalytic-shared/src/lib/models/fantalytic.interface';
import { logError } from '../messaging/error.service';
import { logSuccess } from '../messaging/success.service';
import { DEF_PASS_STATS, DEF_RUSH_STATS } from '../models/defaults/def.const';
import { QB_STATS } from '../models/defaults/qb.const';
import { RB_STATS } from '../models/defaults/rb.const';
import { WR_TE_STATS } from '../models/defaults/wr_te.const';
import { parseDefPassResponse, parseDefRushResponse } from '../parsers/def-parser.service';
import { parserHtmlString } from '../parsers/html-parser.service';

const axios = require('axios');
const cheerio = require('cheerio');

export async function getSiteContent(position: PositionTypes, year: string): Promise<void> {
    let url = '';
    switch(position.toUpperCase()) {
        case PositionTypes.QB:
            url = `${QB_STATS.url}`.replace('{year}', `${year}`);
            break;
        case PositionTypes.RB:
            url = `${RB_STATS.url}`.replace('{year}', `${year}`);
            break;
        case PositionTypes.WR:
        case PositionTypes.TE:
            url = `${WR_TE_STATS.url}`.replace('{year}', `${year}`);
            break;
        case PositionTypes.DEF_RUSH:
            url = `${DEF_RUSH_STATS.url}`.replace('{year}', `${year}`);
            break;
        case PositionTypes.DEF_PASS:
            url = `${DEF_PASS_STATS.url}`.replace('{year}', `${year}`);
            break;
        case PositionTypes.DEF:
            break;
        default:
            logError('Position is not supported');
    }
    if (`${position}`.toUpperCase() !== PositionTypes.DEF) {
        const response = await axios.get(url).then((resp: any) => {
            return resp.data;
        });
        const $ = cheerio.load(response);
        await parserHtmlString(response, position, year);
        return Promise.resolve();
    } else {
        logSuccess('HERE WE ARE');
        const defResp = await axios.get(`${DEF_RUSH_STATS.url}`.replace('{year}', `${year}`)).then((resp: any) => {
            return resp?.data;
        });
        const defPassResp = await axios.get(`${DEF_PASS_STATS.url}`.replace('{year}', `${year}`)).then((resp: any) => {
            return resp?.data;
        });
        logSuccess('PAST HTTP');
        const defRushStats = await parseDefRushResponse(defResp, '');
        const defPassStats = await parseDefPassResponse(defPassResp, '');
        const defStats = parseDefStats(defRushStats, defPassStats, +year);
        const defOutput = `${__dirname}/../output/${year}_def.json`;
        try {
            await writeFileSync(defOutput, JSON.stringify(defStats));
        } catch (ex) {
            logError(`${ex}`);
        }

    }
    
}