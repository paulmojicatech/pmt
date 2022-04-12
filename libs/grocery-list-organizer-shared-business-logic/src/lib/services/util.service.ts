import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private _loader?: HTMLIonLoadingElement;

  constructor(private _loadingController: LoadingController) {}

  async toggleSpinner(shouldShow: boolean): Promise<void> {
    if (shouldShow && !this._loader) {
      this._loader = await this._loadingController.create();
      await this._loader.present();
    } else {
      this._loader?.dismiss();
      this._loader = undefined;
    }
  }
}
