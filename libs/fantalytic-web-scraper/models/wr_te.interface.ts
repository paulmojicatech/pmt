import { IStatPosition } from "./parser.interface";

export interface IWRTEStats {
  url: string;
  player: {
    statSelector: IStatPosition;
    value?: string;
  };
  receptions: {
    statSelector: IStatPosition;
    value?: number;
  };
  receivingYds: {
    statSelector: IStatPosition;
    value?: number;
  };
  receivingTds: {
    statSelector: IStatPosition;
    value?: number;
  };
  receiving20Plus: {
    statSelector: IStatPosition;
    value?: number;
  };
  receiving40Plus: {
      statSelector: IStatPosition;
      value?: number;
  };
  receivingTargets: {
      statSelector: IStatPosition;
      value?: number;
  };
}
