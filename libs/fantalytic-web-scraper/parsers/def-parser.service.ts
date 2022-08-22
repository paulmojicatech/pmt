import { IDefPassingStats, IDefRusingStats } from "../../fantalytic-shared/src/lib/models/fantalytic.interface";
import { DEF_PASS_STATS, DEF_RUSH_STATS } from "../models/defaults/def.const";

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

export async function parseDefPassResponse(table: unknown, url: string): Promise<IDefPassingStats[]> {
    let defPassStats: IDefPassingStats[] = [];

    const playerSelector = DEF_PASS_STATS.team.statSelector;
    const comppctSelector = DEF_PASS_STATS.compPct.statSelector;
    const ydsSelector = DEF_PASS_STATS.yds.statSelector;
    const tdsSelector = DEF_PASS_STATS.td.statSelector;
    const intSelector = DEF_PASS_STATS.int.statSelector;
    const sackSelector = DEF_PASS_STATS.sacks.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let defPass: IDefPassingStats = {
            url,
            team: {
                statSelector: playerSelector
            },
            compPct: {
                statSelector: comppctSelector
            },
            yds: {
                statSelector: ydsSelector
            },
            td: {
                statSelector: tdsSelector
            },
            int: {
                statSelector: intSelector
            },
            sacks: {
                statSelector: sackSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                team,
                compPct,
                yds,
                td,
                int,
                sacks
             } = defPass;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                team = {
                    ...team,
                    value: playerParentSelector.html().trim()
                };
                defPass = {
                    ...defPass,
                    team
                };
            } else if (colIndex === comppctSelector.statColIndex) {
                compPct = {
                    ...compPct,
                    value: +(<string>$(col).html()).trim()
                };
                defPass = {
                    ...defPass,
                    compPct
                };
            } else if (colIndex === ydsSelector.statColIndex) {
                yds = {
                    ...yds,
                    value: +(<string>$(col).html()).trim()
                };
                defPass = {
                    ...defPass,
                    yds
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                td = {
                    ...td,
                    value: +(<string>$(col).html()).trim()
                };
                defPass = {
                    ...defPass,
                    td
                };
            } else if (colIndex === intSelector.statColIndex) {
                int = {
                    ...int,
                    value: +(<string>$(col).html()).trim()
                };
                defPass = {
                    ...defPass,
                    int
                };
            } else if (colIndex === sackSelector.statColIndex) {
                sacks = {
                    ...sacks,
                    value: +(<string>$(col).html()).trim()
                };
                defPass = {...defPass, sacks};
            }
        });
        defPassStats = [...defPassStats, defPass];
    });

    return Promise.resolve(defPassStats);
}