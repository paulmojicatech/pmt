/* eslint-disable @typescript-eslint/no-var-requires */
import { IDefPassingStats, IDefRusingStats, parseDefStats, Defense, DEF_RUSH_STATS, DEF_PASS_STATS } from '@pmt/fantalytic-shared';

const cheerio = require('cheerio');
const axios = require('axios');
const DEF_PASS_STATS_URL = DEF_PASS_STATS.url;
const DEF_RUSH_STATS_URL = DEF_RUSH_STATS.url;

export async function getDefStats(year: number, url = ''): Promise<Defense[]> {
    const defUrlToUse = url ? url : DEF_RUSH_STATS_URL.replace('{year}', `${year}`);
    const response = (await axios.get(defUrlToUse))?.data;
    const defRushStats = parseDefRushResponse(response, defUrlToUse);

    const defPassUrlToUse = url? url : DEF_PASS_STATS_URL.replace('{year}', `${year}`);
    const defPassResp = (await axios.get(defPassUrlToUse))?.data;
    const defPassStats = parseDefPassResponse(defPassResp, defPassUrlToUse);
    
    const parsedDefStats = parseDefStats(defRushStats, defPassStats, year);
    const defs = parsedDefStats;
    return Promise.resolve(defs);
    
}

export function parseDefRushResponse(table: unknown, url: string): IDefRusingStats[] {
    let defRushStats: IDefRusingStats[] = [];

    const teamSelector = DEF_RUSH_STATS.team.statSelector;
    const imgUrlSelector = DEF_RUSH_STATS.imageUrl.statSelector;
    const allowedRushingYdsSelector = DEF_RUSH_STATS.rushYds.statSelector;
    const ypcSelector = DEF_RUSH_STATS.ypc.statSelector;
    const tdsSelector = DEF_RUSH_STATS.td.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let defRushStat: IDefRusingStats = {
            url,
            team: {
                statSelector: teamSelector
            },
            imageUrl: {
                statSelector: imgUrlSelector
            },
            ypc: {
                statSelector: ypcSelector
            },
            rushYds: {
                statSelector: allowedRushingYdsSelector
            },
            td: {
                statSelector: tdsSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                team,
                imageUrl,
                ypc,
                rushYds,
                td
             } = defRushStat;
             
            if (colIndex === teamSelector.statColIndex) {
                const teamParentSelector = $(`.${teamSelector.statName}`, $(row));
                team = {
                    ...team,
                    value: teamParentSelector?.html()?.trim() ?? 'Bad Data'
                };
                const imgParentSelector = $(`.d3-o-club-logo`, $(row));
                const imgSrcSelector = $(`.${imgUrlSelector.statName}`, $(imgParentSelector));
                imageUrl = {
                    ...imageUrl,
                    value: imgSrcSelector?.attr('src') ?? ''
                };
                defRushStat = {
                    ...defRushStat,
                    team,
                    imageUrl
                };
            } else if (colIndex === ypcSelector.statColIndex) {
                ypc = {
                    ...ypc,
                    value: +(<string>$(col).html())?.trim() ?? 0
                }
                defRushStat = {
                    ...defRushStat,
                    ypc
                };
            } else if (colIndex === allowedRushingYdsSelector.statColIndex) {
                rushYds = {
                    ...rushYds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                defRushStat = {
                    ...defRushStat,
                    rushYds
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                td = {
                    ...td,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                defRushStat = {
                    ...defRushStat,
                    td
                };
            }

        });
        defRushStats = [...defRushStats, defRushStat];
    });

    return defRushStats.filter(stat => stat.team.value !== 'Bad Data');

}

export function parseDefPassResponse(table: unknown, url: string): IDefPassingStats[] {
    let defPassStats: IDefPassingStats[] = [];

    const teamSelector = DEF_PASS_STATS.team.statSelector;
    const imgUrlSelector = DEF_PASS_STATS.imageUrl.statSelector;
    const compPctSelector = DEF_PASS_STATS.compPct.statSelector;
    const intsSelector = DEF_PASS_STATS.int.statSelector;
    const sacksSelector = DEF_PASS_STATS.sacks.statSelector;
    const passYdsSelector = DEF_PASS_STATS.yds.statSelector;
    const passTdSelector = DEF_PASS_STATS.td.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let defPassStat: IDefPassingStats = {
            url,
            team: {
                statSelector: teamSelector
            },
            imageUrl: {
                statSelector: imgUrlSelector
            },
            compPct: {
                statSelector: compPctSelector
            },
            int: {
                statSelector: intsSelector
            },
            sacks: {
                statSelector: sacksSelector
            },
            yds: {
                statSelector: passYdsSelector
            },
            td: {
                statSelector: passTdSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                team,
                imageUrl,
                compPct,
                int,
                sacks,
                td,
                yds
             } = defPassStat;
             
            if (colIndex === teamSelector.statColIndex) {
                const teamParentSelector = $(`.${teamSelector.statName}`, $(row));
                team = {
                    ...team,
                    value: teamParentSelector?.html()?.trim() ?? 'Bad Data'
                };
                
                const imgParentSelector = $(`.d3-o-club-logo`, $(row));
                const imgSrcSelector = $(`.${imgUrlSelector.statName}`, $(imgParentSelector));
                imageUrl = {
                    ...imageUrl,
                    value: imgSrcSelector?.attr('src') ?? ''
                };
                defPassStat = {
                    ...defPassStat,
                    team,
                    imageUrl
                };
            } else if (colIndex === compPctSelector.statColIndex) {
                compPct = {
                    ...compPct,
                    value: +(<string>$(col).html())?.trim() ?? 0
                }
                defPassStat = {
                    ...defPassStat,
                    compPct
                };
            } else if (colIndex === intsSelector.statColIndex) {
                int = {
                    ...int,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                defPassStat = {
                    ...defPassStat,
                    int
                };
            } else if (colIndex === sacksSelector.statColIndex) {
                sacks = {
                    ...sacks,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                defPassStat = {
                    ...defPassStat,
                    sacks
                };
            } else if (colIndex === passYdsSelector.statColIndex) {
                yds = {
                    ...yds,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                defPassStat = {...defPassStat, yds};
            } else if (colIndex === passTdSelector.statColIndex) {
                td = {
                    ...td,
                    value: +(<string>$(col).html())?.trim() ?? 0
                };
                defPassStat = {...defPassStat, td};
            }

        });
        defPassStats = [...defPassStats, defPassStat];
    });

    return defPassStats.filter(stat => stat.team.value !== 'Bad Data');

}

export async function postUpdatedDefs(defenses: Defense[]): Promise<void> {
    try {
        await axios.post('https://fantalytic.io/api/defense', {defenses});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function deleteAllDefsForYear(year: number): Promise<void> {
    try {
        await axios.delete('https://fantalytic.io/api/defense', {data: {year}});
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function recursivelyGetMoreDefs(url: string): Promise<{moreDefStats: IDefRusingStats[], newLink: string}> {
    const response = (await axios.get(url))?.data;
    const defStats = parseDefRushResponse(response, url);
    const $ = cheerio.load(response);
    const nextLinkSelector = $('.nfl-o-table-pagination__next', response);
    const linkUrl = $(nextLinkSelector).attr('href');
    return {moreDefStats: defStats, newLink: linkUrl};
}