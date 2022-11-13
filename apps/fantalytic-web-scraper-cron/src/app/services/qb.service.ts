/* eslint-disable @typescript-eslint/no-var-requires */
import { IQBStats, parseQBStats, QB, QB_STATS } from '@pmt/fantalytic-shared';

const cheerio = require('cheerio');
const axios = require('axios');
const QB_URL = QB_STATS.url;

export async function getQBStats(year: number, url = '', qbs: QB[] = []): Promise<QB[]> {
    const urlToUse = url ? url : QB_URL.replace('{year}', `${year}`);
    const response = (await axios.get(urlToUse))?.data;
    const $ = cheerio.load(response);
    const qbStats = await parseQBResponse(response, urlToUse);
    const parsedQbStats = parseQBStats(qbStats, year);
    qbs = qbs.concat(parsedQbStats);
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    const linkUrl = $(nextLinkSelector).attr('href');
    while (linkUrl) {
        await getQBStats(year, `https://nfl.com${linkUrl}`, qbs);
    }

    return Promise.resolve(qbs);
}

/*  */


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