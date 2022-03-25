import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Recomendation } from '../../models/home.interface';
import { loadRecommendationsSuccess } from '../../state/home/actions/home.actions';
import { MarvelHttpService } from '../http/marvel-http.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersUtilService {
  constructor(private _marvelHttp: MarvelHttpService) {}

  getCharactersFromStore(): Observable<Action> {
    return this._marvelHttp.getCharacters().pipe(
      map((characters) => {
        const recomendation: Recomendation = {
          characters,
        };
        return loadRecommendationsSuccess({ recomendations: recomendation });
      })
    );
  }
}
