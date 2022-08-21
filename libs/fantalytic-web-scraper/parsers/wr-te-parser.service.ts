import { WR_TE_STATS } from "../models/defaults/wr_te.const";
import { IWRTEStats } from "../../fantalytic-shared/src/index";

const cheerio = require('cheerio');

export async function parseWRTEResponse(table: unknown, url: string): Promise<IWRTEStats[]> {
    let wrTeStats: IWRTEStats[] = [];

    const playerSelector = WR_TE_STATS.player.statSelector;
    const receptionsSelector = WR_TE_STATS.receptions.statSelector;
    const receptionYdsSelector = WR_TE_STATS.receivingYds.statSelector;
    const receptionTdsSelector = WR_TE_STATS.receivingTds.statSelector;
    const reception20PlusSelector = WR_TE_STATS.receiving20PlusYds.statSelector;
    const reception40PlusSelector = WR_TE_STATS.receiving40PlusYds.statSelector;
    const receptionTargetsSelector = WR_TE_STATS.receivingTargets.statSelector;

    const $ = cheerio.load(table);

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let wrTeStat: IWRTEStats = {
            url,
            player: {
                statSelector: playerSelector
            },
            receptions: {
                statSelector: receptionsSelector
            },
            receivingYds: {
                statSelector: receptionYdsSelector
            },
            receivingTds: {
                statSelector: receptionTdsSelector
            },
            receiving20Plus: {
                statSelector: reception20PlusSelector
            },
            receiving40Plus: {
                statSelector: reception40PlusSelector
            },
            receivingTargets:{
                statSelector: receptionTargetsSelector
            }
        };

        $('td', row).each((colIndex: number, col: any) => {
            let {
                player,
                receptions,
                receivingYds,
                receivingTds,
                receiving20Plus,
                receiving40Plus,
                receivingTargets
             } = wrTeStat;
             
             if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                player = {
                    ...player,
                    value: playerParentSelector.html().trim()
                };
                wrTeStat = {
                    ...wrTeStat,
                    player
                };
            } else if (colIndex === receptionsSelector.statColIndex) {
                receptions = {
                    ...receptions,
                    value: +(<string>$(col).html()).trim()
                }
                wrTeStat = {
                    ...wrTeStat,
                    receptions
                };
            } else if (colIndex === receptionYdsSelector.statColIndex) {
                receivingYds = {
                    ...receivingYds,
                    value: +(<string>$(col).html()).trim()
                };
                wrTeStat = {
                    ...wrTeStat,
                    receivingYds
                };
            } else if (colIndex === receptionTdsSelector.statColIndex) {
                receivingTds = {
                    ...receivingTds,
                    value: +(<string>$(col).html()).trim()
                };
                wrTeStat = {
                    ...wrTeStat,
                    receivingTds
                };
            } else if (colIndex === reception20PlusSelector.statColIndex) {
                receiving20Plus = {
                    ...receiving20Plus,
                    value: +(<string>$(col).html()).trim()
                };
                wrTeStat = {
                    ...wrTeStat,
                    receiving20Plus
                };
            } else if (colIndex === reception40PlusSelector.statColIndex) {
                receiving40Plus = {
                    ...receiving40Plus,
                    value: +(<string>$(col).html()).trim()
                };
                wrTeStat = {
                    ...wrTeStat,
                    receiving40Plus
                }
            } else if (colIndex === receptionTargetsSelector.statColIndex) {
                receivingTargets = {
                    ...receivingTargets,
                    value: +(<string>$(col).html()).trim()
                };
                wrTeStat = {
                    ...wrTeStat,
                    receivingTargets
                };
            }

        });
        wrTeStats = [...wrTeStats, wrTeStat];
    });

    return Promise.resolve(wrTeStats);

}
