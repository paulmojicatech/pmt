import { IRBStats } from "../../fantalytic-shared/src/lib/models/fantalytic.interface";
import { RB_STATS } from "../models/defaults/rb.const";

const cheerio = require('cheerio');

export async function parseRBResponse(table: unknown, url: string): Promise<IRBStats[]> {
    let rbStats: IRBStats[] = [];

    const playerSelector = RB_STATS.player.statSelector;
    const rushingYdsSelector = RB_STATS.rushingYds.statSelector;
    const rushAttemptsSelector = RB_STATS.rushingAttempts.statSelector;
    const rushingTdsSelector = RB_STATS.rushingTds.statSelector;
    const rushing20PlusYdsSelector = RB_STATS.rushing20Yds.statSelector;
    const rushing40PlusYdsSelector = RB_STATS.rushing40Yds.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let rbStat: IRBStats = {
            url,
            player: {
                statSelector: playerSelector
            },
            rushingYds: {
                statSelector: rushingYdsSelector
            },
            rushAttempts: {
                statSelector: rushAttemptsSelector
            },
            rushingTds: {
                statSelector: rushingTdsSelector
            },
            rushing20Yds: {
                statSelector: rushing20PlusYdsSelector
            },
            rushing40Yds: {
                statSelector: rushing40PlusYdsSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                player,
                rushingYds,
                rushAttempts,
                rushingTds,
                rushing20Yds,
                rushing40Yds
             } = rbStat;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                player = {
                    ...player,
                    value: playerParentSelector.html().trim()
                };
                rbStat = {
                    ...rbStat,
                    player
                };
            } else if (colIndex === rushingYdsSelector.statColIndex) {
                rushingYds = {
                    ...rushingYds,
                    value: +(<string>$(col).html()).trim()
                }
                rbStat = {
                    ...rbStat,
                    rushingYds
                };
            } else if (colIndex === rushAttemptsSelector.statColIndex) {
                rushAttempts = {
                    ...rushAttempts,
                    value: +(<string>$(col).html()).trim()
                };
                rbStat = {
                    ...rbStat,
                    rushAttempts
                };
            } else if (colIndex === rushingTdsSelector.statColIndex) {
                rushingTds = {
                    ...rushingTds,
                    value: +(<string>$(col).html()).trim()
                };
                rbStat = {
                    ...rbStat,
                    rushingTds
                };
            } else if (colIndex === rushing20PlusYdsSelector.statColIndex) {
                rushing20Yds = {
                    ...rushing20Yds,
                    value: +(<string>$(col).html()).trim()
                };
                rbStat = {
                    ...rbStat,
                    rushing20Yds
                };
            } else if (colIndex === rushing40PlusYdsSelector.statColIndex) {
                rushing40Yds = {
                    ...rushing40Yds,
                    value: +(<string>$(col).html()).trim()
                }
            }

        });
        rbStats = [...rbStats, rbStat];
    });

    return Promise.resolve(rbStats);

}