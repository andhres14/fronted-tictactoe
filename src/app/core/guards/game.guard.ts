import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from '../services/game.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  constructor(private gameService: GameService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.gameService.checkInProgress()
      .pipe(
        tap(isValid => {
          if (!isValid) {
            this.gameService.logout();
          }
        })
      );
  }
}
