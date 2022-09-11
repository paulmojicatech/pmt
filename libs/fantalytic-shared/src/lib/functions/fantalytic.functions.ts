import { Defense, IDefPassingStats, IDefRusingStats, IQBStats, QB } from '../models/fantalytic.interface';

export function parseQBStats(qbStats: IQBStats[], year: number): QB[] {
  return qbStats.map((stat) => {
    return {
      player: stat.player.value,
      year,
      passingYds: stat.passingYds.value,
      tds: stat.tds.value,
      passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
      ints: stat.ints.value,
    } as QB;
  });
}

export function parseDefStats(defRushStats: IDefRusingStats[], offPassStats: IDefPassingStats[], year: number): Defense[] {
  let defs: Defense[] = [];
  for (const def of [...defRushStats, ...offPassStats]) {
    const found = defs.findIndex(find => find.team === def.team.value);
    let updatedDef: Defense;
    const isRush = Object.keys(def).includes('rushYds');
    if (isRush) {
      updatedDef = parseDefRushingStats(def as IDefRusingStats);
    } else {
      updatedDef = parseDefPassingStats(def as IDefPassingStats);
    }
    
    if (found > -1) {
      defs[found] = {...defs[found], ...updatedDef, year};
    } else {
      defs = [...defs, updatedDef];
    }
  }
  return defs;
}

function parseDefRushingStats(def: IDefRusingStats): Defense {
 return {
      team: def.team?.value ?? '',
      rushYdsAllowed: def.rushYds?.value ?? 0,
      ydsPerCarry: def.ypc?.value ?? 0,
      rushTdsAllowed: def.td?.value ?? 0
    } as Defense;
}

function parseDefPassingStats(def: IDefPassingStats): Defense {
  return {
    team: def.team?.value ?? '',
    completionPctAllowed: def.compPct?.value ?? 0,
    passYdsAllowed: def.yds?.value ?? 0,
    ints: def.int?.value ?? 0,
    sacks: def.sacks?.value ?? 0
  } as Defense;
}
