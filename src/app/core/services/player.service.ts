import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  updatePlayerName(gameId: number, playerId: number, formData): Observable<any> {
    return this.http
      .put(`${ baseUrl }/games/${ gameId }/players/${ playerId }`, formData);
  }
}
