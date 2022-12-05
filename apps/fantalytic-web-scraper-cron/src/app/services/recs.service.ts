/* eslint-disable @typescript-eslint/no-var-requires */
import { IWRTEStats, parseRecevingStats, Receivers, WR_TE_STATS } from '@pmt/fantalytic-shared';

const cheerio = require('cheerio');
const axios = require('axios');
const REC_STATS = WR_TE_STATS.url;

export async function getRecStats(year: number, url = ''): Promise<Receivers[]> {
    const urlToUse = url ? url : REC_STATS.replace('{year}', `${year}`);
    const response = (await axios.get(urlToUse))?.data;
    const $ = cheerio.load(response); 
    const recStats = parseRecResponse(response, urlToUse);
    const parsedRecStats = parseRecevingStats(recStats, year);
    let recs = parsedRecStats;
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    let linkUrl = $(nextLinkSelector).attr('href');
    while (linkUrl) {
        const {moreRecStats, newLink} = await recursivelyGetMoreRecs(`https://nfl.com${linkUrl}`);
        const moreRecs = parseRecevingStats(moreRecStats, year);
        recs = recs.concat(moreRecs);
        linkUrl = newLink
        
    }
    return Promise.resolve(recs);
    
}

export function parseRecResponse(table: unknown, url: string): IWRTEStats[] {
    let recStats: IWRTEStats[] = [];

    const playerSelector = WR_TE_STATS.player.statSelector;
    const imgSelector = WR_TE_STATS.imageUrl.statSelector;
    const receptionsStatSelector = WR_TE_STATS.receptions.statSelector;
    const targetsSelector = WR_TE_STATS.receivingTargets.statSelector;
    const recYdsSelector = WR_TE_STATS.receivingYds.statSelector;
    const tdsSelector = WR_TE_STATS.receivingTds.statSelector;
    const rec20plusyardseach = WR_TE_STATS.receiving20PlusYds.statSelector;
    const rec40plusyardseach = WR_TE_STATS.receiving40PlusYds.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let recStat: IWRTEStats = {
            url,
            player: {
                statSelector: playerSelector
            },
            imageUrl: {
                statSelector: imgSelector
            },
            receptions: {
                statSelector: receptionsStatSelector
            },
            receivingTargets: {
                statSelector: targetsSelector
            },
            receiving20Plus: {
                statSelector: rec20plusyardseach
            },
            receivingTds: {
                statSelector: tdsSelector
            },
            receiving40Plus: {
                statSelector: rec40plusyardseach
            },
            receivingYds: {
                statSelector: recYdsSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                player,
                imageUrl,
                receptions,
                receivingTargets,
                receiving20Plus,
                receivingTds,
                receiving40Plus,
                receivingYds
             } = recStat;
             
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
                recStat = {
                    ...recStat,
                    player,
                    imageUrl
                };
            } else if (colIndex === receptionsStatSelector.statColIndex) {
                receptions = {
                    ...receptions,
                    value: +(<string>$(col).html())?.trim() ?? 0
                }
                recStat = {
                    ...recStat,
                    receptions
                };
            } else if (colIndex === targetsSelector.statColIndex) {
                receivingTargets = {
                    ...receivingTargets,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                recStat = {
                    ...recStat,
                    receivingTargets
                };
            } else if (colIndex === rec20plusyardseach.statColIndex) {
                receiving20Plus = {
                    ...receiving20Plus,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                recStat = {
                    ...recStat,
                    receiving20Plus
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                receivingTds = {
                    ...receivingTds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                recStat = {
                    ...recStat,
                    receivingTds
                };
            } else if (colIndex === rec40plusyardseach.statColIndex) {
                receiving40Plus = {
                    ...receiving40Plus,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                recStat = {
                    ...recStat,
                    receiving40Plus
                };
            } else if (colIndex === recYdsSelector.statColIndex) {
                receivingYds = {
                    ...receivingYds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                recStat = {...recStat, receivingYds};
            }

        });
        recStats = [...recStats, recStat];
    });

    return recStats.filter(stat => stat.player.value !== 'Bad Data');

}

export async function postUpdatedRecs(recs: Receivers[]): Promise<void> {
    try {
        await axios.post('https://fantalytic.io/api/wr_te', {receivers: recs});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function deleteAllRecsForYear(year: number): Promise<void> {
    try {
        await axios.delete('https://fantalytic.io/api/wr_te', {data: {year}});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function recursivelyGetMoreRecs(url: string): Promise<{moreRecStats: IWRTEStats[], newLink: string}> {
    const response = (await axios.get(url))?.data;
    const recStats = parseRecResponse(response, url);
    const $ = cheerio.load(response);
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    const linkUrl = $(nextLinkSelector).attr('href');
    return {moreRecStats: recStats, newLink: linkUrl};
}