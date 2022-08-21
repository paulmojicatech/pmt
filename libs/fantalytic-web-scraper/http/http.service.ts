import { PositionTypes } from '../../fantalytic-shared/src/lib/models/fantalytic.interface';
import { logError } from '../messaging/error.service';
import { DEF_RUSH_STATS } from '../models/defaults/def.const';
import { QB_STATS } from '../models/defaults/qb.const';
import { RB_STATS } from '../models/defaults/rb.const';
import { WR_TE_STATS } from '../models/defaults/wr_te.const';
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
        default:
            logError('Position is not supported');
    }
    const response = await axios.get(url).then((resp: any) => {
        return resp.data;
    });
    const $ = cheerio.load(response);
    await parserHtmlString(response, position, year);
    return Promise.resolve();
}