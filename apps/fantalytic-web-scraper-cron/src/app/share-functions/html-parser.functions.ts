/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseQBStats, PositionTypes } from "@pmt/fantalytic-shared";
import { parseQBResponse } from "../services/qb.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

export async function parserHtmlString(html: any, type: PositionTypes, year: string, week: number, isUpload: boolean, url = ''): Promise<any> {
    // switch (type.toUpperCase()) {        
       
        // case PositionTypes.RB: {
        //     const rbStats = await parseRBResponse(html, url);
        //     const parsedRbStats = parseRbStats(rbStats, +year, week);
        //     const rbOutputPath = `${__dirname}/../output/${year}_rb.json`;
        //     try {
        //         if (!isUpload) {
        //             await writeFileSync(rbOutputPath, JSON.stringify(parsedRbStats));
        //         } else {
        //             const body = {rbs: parsedRbStats};
        //             await axios.post('https://fantalytic.io/api/rb', body);
        //         }
                
        //     } catch (ex) {
        //         logError(`${ex}`);
        //     }
        //     break;
        // }
        // case PositionTypes.WR:
        // case PositionTypes.TE: {
        //     const wrTeStats = await parseWRTEResponse(html, url);
        //     const parsedRecStats = parseRecevingStats(wrTeStats, +year, week);
        //     const wrTeOutputPath = `${__dirname}/../output/${year}_wr_te.json`;
        //     try {
        //         if (!isUpload) {
        //             await writeFileSync(wrTeOutputPath, JSON.stringify(parsedRecStats));
        //         } else {
        //             const body = {receivers: parsedRecStats};
        //             await axios.post('https://fantalytic.io/api/wr_te', body);
        //         }
        //     } catch (ex) {
        //         logError(`${ex}`);
        //     }
        //     break;
        // }
        // case PositionTypes.DEF_RUSH:
        //     const defRushStats = await parseDefRushResponse(html, url);
        //     const defRushOutputPath = `${__dirname}/../output/${year}_def_rush.json`;
        //     try {
        //         await writeFileSync(defRushOutputPath, JSON.stringify(defRushStats));
        //     } catch (ex) {
        //         logError(`${ex}`);
        //     }
        //     break;
        // case PositionTypes.DEF_PASS:
        //     const defPassStats = await parseDefPassResponse(html, url);
        //     const defPassOutputPath = `${__dirname}/../output/${year}_def_pass.json`;
        //     try {
        //         await writeFileSync(defPassOutputPath, JSON.stringify(defPassStats));
        //     } catch (ex) {
        //         logError(`${ex}`);
        //     }
        //     break;
        // default:
        //     break;
    // }
    return Promise.resolve();
}