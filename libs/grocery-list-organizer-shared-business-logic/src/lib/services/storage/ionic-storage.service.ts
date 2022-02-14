import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable, take } from 'rxjs';
import { IonicStorageType } from './models/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class IonicStorageService {
  constructor(private _storage: Storage) {
    this._storage.create();
  }

  getItem(key: IonicStorageType): Observable<string> {
    const value$ = from(this._storage.get(`${key}`));
    return value$.pipe(take(1));
  }

  setItem(key: IonicStorageType, value: string): void {
    this._storage.set(`${key}`, value);
  }
}
