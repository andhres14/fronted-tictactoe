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

  checkToken(): Observable<boolean> {
    return this.http.get(`${ baseUrl }/login/refresh`).pipe(
      map((resp: any) => {
        const { name, email, google, role, img = '', uid } = resp.user;
        localStorage.setItem('userToken', resp.token);
        return true;
      }),
      catchError(err => of(false))
    );
  }


  createNewGame(): Observable<any> {
    return this.http.post(`${ baseUrl }/games`, {});
  }

  resetGame(formData: { first_player: string, second_player: string }): Observable<any> {
    return this.http.post(`${ baseUrl }/games`, formData);
  }

  getGameInfo(gameId: number): Observable<any> {
    return this.http.get(`${ baseUrl }/games/${ gameId }`);
  }

  playGame(gameId: number, formData: { player: number, box_selected: number }): Observable<any> {
    return this.http.put(`${ baseUrl }/games/${ gameId }`, formData);
  }

  logout(): void {
    localStorage.removeItem('gameData');
    this.router.navigateByUrl('/welcome/app');
  }
}
