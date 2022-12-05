/* eslint-disable @typescript-eslint/no-var-requires */
import { IRBStats, parseRbStats, RB, RB_STATS } from '@pmt/fantalytic-shared';

const cheerio = require('cheerio');
const axios = require('axios');
const RB_URL = RB_STATS.url;

export async function getRBStats(year: number, url = ''): Promise<RB[]> {
    const urlToUse = url ? url : RB_URL.replace('{year}', `${year}`);
    const response = (await axios.get(urlToUse))?.data;
    const $ = cheerio.load(response); 
    const rbStats = parseRBResponse(response, urlToUse);
    const parsedRbStats = parseRbStats(rbStats, year);
    let rbs = parsedRbStats;
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    let linkUrl = $(nextLinkSelector).attr('href');
    while (linkUrl) {
        const {moreRbStats, newLink} = await recursivelyGetMoreRBs(`https://nfl.com${linkUrl}`);
        const moreRbs = parseRbStats(moreRbStats, year);
        rbs = rbs.concat(moreRbs);
        linkUrl = newLink
        
    }
    return Promise.resolve(rbs);
    
}

export function parseRBResponse(table: unknown, url: string): IRBStats[] {
    let rbStats: IRBStats[] = [];

    const playerSelector = RB_STATS.player.statSelector;
    const imgSelector = RB_STATS.imageUrl.statSelector;
    const rushingStatSelector = RB_STATS.rushingYds.statSelector;
    const rushingAttempts = RB_STATS.rushingAttempts.statSelector;
    const rushing20plusyardseach = RB_STATS.rushing20Yds.statSelector;
    const tdsSelector = RB_STATS.rushingTds.statSelector;
    const rushing40plusyardseach = RB_STATS.rushing40Yds.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let rbStat: IRBStats = {
            url,
            player: {
                statSelector: playerSelector
            },
            imageUrl: {
                statSelector: imgSelector
            },
            rushAttempts: {
                statSelector: rushingAttempts
            },
            rushingYds: {
                statSelector: rushingStatSelector
            },
            rushing20Yds: {
                statSelector: rushing20plusyardseach
            },
            rushingTds: {
                statSelector: tdsSelector
            },
            rushing40Yds: {
                statSelector: rushing40plusyardseach
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                player,
                imageUrl,
                rushAttempts,
                rushingYds,
                rushing20Yds,
                rushingTds,
                rushing40Yds
             } = rbStat;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                player = {
                    ...player,
                    value: playerParentSelector?.html()?.trim() ?? 'Bad Data'
                };
                const imgParentSelector = $(`.d3-o-player-headshot`, $(row));
                const imgSrcSelector = $(`.${imgSelector.statName}`, $(imgParentSelector));
                imageUrl = {
                    ...imageUrl,
                    value: `${imgSrcSelector?.attr('src')}`?.replace('/t_lazy', '') ?? ''
                };
                rbStat = {
                    ...rbStat,
                    player,
                    imageUrl
                };
            } else if (colIndex === rushingStatSelector.statColIndex) {
                rushingYds = {
                    ...rushingYds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                }
                rbStat = {
                    ...rbStat,
                    rushingYds
                };
            } else if (colIndex === rushingAttempts.statColIndex) {
                rushAttempts = {
                    ...rushAttempts,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                rbStat = {
                    ...rbStat,
                    rushAttempts
                };
            } else if (colIndex === rushing20plusyardseach.statColIndex) {
                rushing20Yds = {
                    ...rushing20Yds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                rbStat = {
                    ...rbStat,
                    rushing20Yds
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                rushingTds = {
                    ...rushingTds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                rbStat = {
                    ...rbStat,
                    rushingTds
                };
            } else if (colIndex === rushing40plusyardseach.statColIndex) {
                rushing40Yds = {
                    ...rushing40Yds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                rbStat = {
                    ...rbStat,
                    rushing40Yds
                };
            }

        });
        rbStats = [...rbStats, rbStat];
    });

    return rbStats.filter(stat => stat.player.value !== 'Bad Data');

}

export async function postUpdatedRBs(rbs: RB[]): Promise<void> {
    try {
        await axios.post('https://fantalytic.io/api/rb', {rbs});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function deleteAllRBsForYear(year: number): Promise<void> {
    try {
        await axios.delete('https://fantalytic.io/api/rb', {data: {year}});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function recursivelyGetMoreRBs(url: string): Promise<{moreRbStats: IRBStats[], newLink: string}> {
    const response = (await axios.get(url))?.data;
    const rbStats = parseRBResponse(response, url);
    const $ = cheerio.load(response);
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    const linkUrl = $(nextLinkSelector).attr('href');
    return {moreRbStats: rbStats, newLink: linkUrl};
}