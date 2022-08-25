import { createFeatureSelector } from "@ngrx/store";
import { FantasyFootballState } from "../../models/fantasy-football.interface";

export const getFantasyFootballState = createFeatureSelector<FantasyFootballState>('fantasy-football');