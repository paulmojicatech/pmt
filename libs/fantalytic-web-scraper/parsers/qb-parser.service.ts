import { QB_STATS } from "../models/defaults/qb.const";
import { IQBStats } from "../models/qb.interface";

const cheerio = require('cheerio');

export async function parseQBResponse(table: unknown, url: string): Promise<IQBStats[]> {
    let qbStats: IQBStats[] = [];

    const playerSelector = QB_STATS.player.statSelector;
    const passingStatSelector = QB_STATS.passingYds.statSelector;
    const passingYdsPerAttemptSelector = QB_STATS.passingYdsPerAttempt.statSelector;
    const intsSelector = QB_STATS.ints.statSelector;
    const tdsSelector = QB_STATS.tds.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let qbStat: IQBStats = {
            url,
            player: {
                statSelector: playerSelector
            },
            passingYds: {
                statSelector: passingStatSelector
            },
            ints: {
                statSelector: intsSelector
            },
            passingYdsPerAttempt: {
                statSelector: passingYdsPerAttemptSelector
            },
            tds: {
                statSelector: tdsSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                player,
                passingYds,
                passingYdsPerAttempt,
                ints,
                tds
             } = qbStat;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                player = {
                    ...player,
                    value: playerParentSelector.html().trim()
                };
                qbStat = {
                    ...qbStat,
                    player
                };
            } else if (colIndex === passingStatSelector.statColIndex) {
                passingYds = {
                    ...passingYds,
                    value: +(<string>$(col).html()).trim()
                }
                qbStat = {
                    ...qbStat,
                    passingYds
                };
            } else if (colIndex === passingYdsPerAttemptSelector.statColIndex) {
                passingYdsPerAttempt = {
                    ...passingYdsPerAttempt,
                    value: +(<string>$(col).html()).trim()
                };
                qbStat = {
                    ...qbStat,
                    passingYdsPerAttempt
                };
            } else if (colIndex === intsSelector.statColIndex) {
                ints = {
                    ...ints,
                    value: +(<string>$(col).html()).trim()
                };
                qbStat = {
                    ...qbStat,
                    ints
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                tds = {
                    ...tds,
                    value: +(<string>$(col).html()).trim()
                };
                qbStat = {
                    ...qbStat,
                    tds
                };
            }

        });
        qbStats = [...qbStats, qbStat];
    });

    return Promise.resolve(qbStats);

}