import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private _loader?: HTMLIonLoadingElement;

  constructor(
    private _loadingController: LoadingController,
    private _toastController: ToastController
  ) {}

  async toggleSpinner(shouldShow: boolean): Promise<void> {
    if (shouldShow && !this._loader) {
      this._loader = await this._loadingController.create();
      await this._loader.present();
    } else {
      this._loader?.dismiss();
      this._loader = undefined;
    }
  }

  async showToastMessage(message: string, isError: boolean): Promise<void> {
    const toast = await this._toastController.create({
      message,
      color: isError ? 'danger' : 'success',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
