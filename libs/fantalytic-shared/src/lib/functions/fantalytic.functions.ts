import { Defense, IDefPassingStats, IDefRusingStats, IQBStats, IRBStats, IWRTEStats, QB, RB, Receivers } from '../models/fantalytic.interface';

export function parseQBStats(qbStats: IQBStats[], year: number, week = 0): QB[] {
  return qbStats.map((stat) => {
    return {
      player: stat.player.value,
      year,
      week,
      passingYds: stat.passingYds.value,
      tds: stat.tds.value,
      passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
      ints: stat.ints.value,
    } as QB;
  });
}

export function parseRbStats(rbStats: IRBStats[], year: number, week = 0): RB[] {
  return rbStats.map(stat => {
    const rb: RB = {
      player: stat.player.value ?? '',
      year,
      week,
      rushingYds: stat.rushingYds.value ?? 0,
      rushAttempts: stat.rushAttempts.value ?? 0,
      rushingTds: stat.rushingTds.value ?? 0,
      rushing20Yds: stat.rushing20Yds.value ?? 0
    };
    return rb;
  })
}

export function parseRecevingStats(wrStats: IWRTEStats[], year: number, week = 0): Receivers[] {
  return wrStats.map(stat => {
    const rec: Receivers = {
      player: stat.player.value ?? '',
      year,
      week,
      receptions: stat.receptions.value ?? 0,
      receiving20Plus: stat.receiving20Plus.value ?? 0,
      receiving40Plus: stat.receiving40Plus.value ?? 0,
      receivingTargets: stat.receivingTargets.value ?? 0,
      receivingTds: stat.receivingTds.value ?? 0,
      receivingYds: stat.receivingYds.value ?? 0
    };
    return rec;
  })
}

export function parseDefStats(defRushStats: IDefRusingStats[], offPassStats: IDefPassingStats[], year: number, week = 0): Defense[] {
  let defs: Defense[] = [];
  for (const def of [...defRushStats, ...offPassStats]) {
    const found = defs.findIndex(find => find.team === def.team.value);
    let updatedDef: Defense;
    const isRush = Object.keys(def).includes('rushYds');
    if (isRush) {
      updatedDef = parseDefRushingStats(def as IDefRusingStats, week);
    } else {
      updatedDef = parseDefPassingStats(def as IDefPassingStats, week);
    }
    
    if (found > -1) {
      defs[found] = {...defs[found], ...updatedDef, year, week};
    } else {
      defs = [...defs, updatedDef];
    }
  }
  return defs;
}

function parseDefRushingStats(def: IDefRusingStats, week = 0): Defense {
 return {
      team: def.team?.value ?? '',
      rushYdsAllowed: def.rushYds?.value ?? 0,
      ydsPerCarry: def.ypc?.value ?? 0,
      rushTdsAllowed: def.td?.value ?? 0,
      week
    } as Defense;
}

function parseDefPassingStats(def: IDefPassingStats, week = 0): Defense {
  return {
    team: def.team?.value ?? '',
    completionPctAllowed: def.compPct?.value ?? 0,
    passYdsAllowed: def.yds?.value ?? 0,
    ints: def.int?.value ?? 0,
    sacks: def.sacks?.value ?? 0,
    week
  } as Defense;
}
