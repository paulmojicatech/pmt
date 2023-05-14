import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MobileCheckerService  {

  canActivate(): boolean {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      alert('This feature is not yet available for mobile');
      return false;
    }
    return true;
  }
}
