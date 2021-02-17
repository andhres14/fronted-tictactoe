import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  checkInProgress(): Observable<boolean> {
    const data = JSON.parse(localStorage.getItem('gameData'));
    return of(!!(data && data.gameId));
  }


  createNewGame(): Observable<any> {
    return this.http.post(`${ baseUrl }/games`, {})
      .pipe(
        map((resp: any) => resp)
      );
  }

  resetGame(formData: { first_player: string, second_player: string }): Observable<any> {
    return this.http.post(`${ baseUrl }/games/reset`, formData)
      .pipe(
        map((resp: any) => resp)
      );
  }

  getGameInfo(gameId: number): Observable<any> {
    return this.http.get(`${ baseUrl }/games/${ gameId }`)
      .pipe(
        map((resp: any) => resp)
      );
  }

  playGame(gameId: number, formData: { player: number, box_selected: number }): Observable<any> {
    return this.http.put(`${ baseUrl }/games/${ gameId }`, formData)
      .pipe(
        map((resp: any) => resp)
      );
  }

  logout(): void {
    localStorage.removeItem('gameData');
    this.router.navigateByUrl('/app');
  }
}
