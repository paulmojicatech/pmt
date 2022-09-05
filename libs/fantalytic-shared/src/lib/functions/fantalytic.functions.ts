import { IQBStats, QB } from '../models/fantalytic.interface';

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
