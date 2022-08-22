import { IDefRusingStats } from "../../fantalytic-shared/src/lib/models/fantalytic.interface";
import { DEF_RUSH_STATS } from "../models/defaults/def.const";

const cheerio = require('cheerio');

export async function parseDefRushResponse(table: unknown, url: string): Promise<IDefRusingStats[]> {
    let defRushStats: IDefRusingStats[] = [];

    const playerSelector = DEF_RUSH_STATS.team.statSelector;
    const rushYdsSelector = DEF_RUSH_STATS.rushYds.statSelector;
    const ypcSelector = DEF_RUSH_STATS.ypc.statSelector;
    const tdsSelector = DEF_RUSH_STATS.td.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let defRush: IDefRusingStats = {
            url,
            team: {
                statSelector: playerSelector
            },
            rushYds: {
                statSelector: rushYdsSelector
            },
            ypc: {
                statSelector: ypcSelector
            },
            td: {
                statSelector: tdsSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                team,
                rushYds,
                ypc,
                td
             } = defRush;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                team = {
                    ...team,
                    value: playerParentSelector.html().trim()
                };
                defRush = {
                    ...defRush,
                    team
                };
            } else if (colIndex === rushYdsSelector.statColIndex) {
                rushYds = {
                    ...rushYds,
                    value: +(<string>$(col).html()).trim()
                };
                defRush = {
                    ...defRush,
                    rushYds
                };
            } else if (colIndex === ypcSelector.statColIndex) {
                ypc = {
                    ...ypc,
                    value: +(<string>$(col).html()).trim()
                };
                defRush = {
                    ...defRush,
                    ypc
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                td = {
                    ...td,
                    value: +(<string>$(col).html()).trim()
                };
                defRush = {
                    ...defRush,
                    td
                };
            }
        });
        defRushStats = [...defRushStats, defRush];
    });

    return Promise.resolve(defRushStats);

}