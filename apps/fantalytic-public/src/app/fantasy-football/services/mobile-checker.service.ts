import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MobileCheckerService implements CanActivate {

  canActivate(): boolean {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      alert('This feature is not yet available for mobile');
      return false;
    }
    return true;
  }
}
