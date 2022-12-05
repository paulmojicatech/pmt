/* eslint-disable @typescript-eslint/no-var-requires */
import { IQBStats, parseQBStats, QB, QB_STATS } from '@pmt/fantalytic-shared';

const cheerio = require('cheerio');
const axios = require('axios');
const QB_URL = QB_STATS.url;

export async function getQBStats(year: number, url = ''): Promise<QB[]> {
    const urlToUse = url ? url : QB_URL.replace('{year}', `${year}`);
    const response = (await axios.get(urlToUse))?.data;
    const $ = cheerio.load(response); 
    const qbStats = parseQBResponse(response, urlToUse);
    const parsedQbStats = parseQBStats(qbStats, year);
    let qbs = parsedQbStats;
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    let linkUrl = $(nextLinkSelector).attr('href');
    while (linkUrl) {
        const {moreQbStats, newLink} = await recursivelyGetMoreQBs(`https://nfl.com${linkUrl}`);
        const moreQbs = parseQBStats(moreQbStats, year);
        qbs = qbs.concat(moreQbs);
        linkUrl = newLink
        
    }
    return Promise.resolve(qbs);
    
}

export function parseQBResponse(table: unknown, url: string): IQBStats[] {
    let qbStats: IQBStats[] = [];

    const playerSelector = QB_STATS.player.statSelector;
    const imgSelector = QB_STATS.imageUrl.statSelector;
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
            imageUrl: {
                statSelector: imgSelector
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
                imageUrl,
                passingYds,
                passingYdsPerAttempt,
                ints,
                tds
             } = qbStat;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                const imgParentSelector = $(`.d3-o-player-headshot`, $(row));
                const imgSrcSelector = $(`.${imgSelector.statName}`, $(imgParentSelector));
                player = {
                    ...player,
                    value: playerParentSelector?.html()?.trim() ?? 'Bad Data'
                };
                imageUrl = {
                    ...imageUrl,
                    value: `${imgSrcSelector?.attr('src')}`.replace('/t_lazy', '') ?? ''
                };
                qbStat = {
                    ...qbStat,
                    player,
                    imageUrl
                };
            } else if (colIndex === passingStatSelector.statColIndex) {
                passingYds = {
                    ...passingYds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                }
                qbStat = {
                    ...qbStat,
                    passingYds
                };
            } else if (colIndex === passingYdsPerAttemptSelector.statColIndex) {
                passingYdsPerAttempt = {
                    ...passingYdsPerAttempt,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                qbStat = {
                    ...qbStat,
                    passingYdsPerAttempt
                };
            } else if (colIndex === intsSelector.statColIndex) {
                ints = {
                    ...ints,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                qbStat = {
                    ...qbStat,
                    ints
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                tds = {
                    ...tds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                qbStat = {
                    ...qbStat,
                    tds
                };
            }

        });
        qbStats = [...qbStats, qbStat];
    });

    return qbStats.filter(stat => stat.player.value !== 'Bad Data');

}

export async function postUpdatedQBs(qbs: QB[]): Promise<void> {
    try {
        await axios.post('https://fantalytic.io/api/qb', {qbs});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function deleteAllQBsForYear(year: number): Promise<void> {
    try {
        await axios.delete('https://fantalytic.io/api/qb', {data: {year}});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function recursivelyGetMoreQBs(url: string): Promise<{moreQbStats: IQBStats[], newLink: string}> {
    const response = (await axios.get(url))?.data;
    const qbStats = parseQBResponse(response, url);
    const $ = cheerio.load(response);
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    const linkUrl = $(nextLinkSelector).attr('href');
    return {moreQbStats: qbStats, newLink: linkUrl};
}