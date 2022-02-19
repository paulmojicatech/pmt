import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoginStateService {
  constructor(private _router: NavController) {}

  routeToRegisterUser(route: string[] = ['register']): void {
    this._router.navigateForward(route);
  }
}
