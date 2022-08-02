import { logError } from '../messaging/error.service';
import { QB_STATS } from '../models/defaults/qb.const';
import { RB_STATS } from '../models/defaults/rb.const';
import { WR_TE_STATS } from '../models/defaults/wr_te.const';
import { PositionTypes } from '../models/parser.interface';
import { parserHtmlString } from '../parsers/html-parser.service';

const fetch = require('node-fetch');
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
        default:
            logError('Position is not supported');
    }
    const response = await fetch(url).then((resp: any) => resp.text());
    const $ = cheerio.load(response);
    await parserHtmlString(response, position, year);
    return Promise.resolve();
}