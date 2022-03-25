import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Character,
  CharacterHttpResp,
} from '../../models/characters.interface';
import { HasherService } from '../util/hasher.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MarvelHttpService {
  constructor(
    private _httpClient: HttpClient,
    private _hasher: HasherService
  ) {}

  getCharacters(): Observable<Character[]> {
    return this._httpClient
      .get<CharacterHttpResp>(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=9fd7cf67bbf20e62c20da90fa0629a17`
      )
      .pipe(
        map((httpResp) => {
          const characters: Character[] = httpResp.data.results.map(
            (character) => {
              return {
                id: character.id,
                name: character.name,
                description: character.description,
                thumbnail: `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`,
                comics: [],
              };
            }
          );
          return characters;
        })
      );
  }
}
