import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../../core/services/game.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styles: []
})
export class InitComponent implements OnInit {

  public gameToJoin: number;
  public openInp: boolean;
  public sendingNewGame: boolean;
  public sendingJoinToParty: boolean;

  constructor(private gameService: GameService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  newGame(): void {
    this.sendingNewGame = true;
    this.gameService.createNewGame()
      .subscribe(resp => {
        this.joinToGame({
          gameId: resp.gameId,
          firstPlayer: resp.firstPlayer,
          secondPlayer: resp.secondPlayer,
          currentTurn: resp.firstPlayer.id,
          boxes: resp.gameBoxes
        });
        this.sendingNewGame = false;
      }, err => {
        Swal.fire('Error', err.error.message, 'error');
        this.sendingNewGame = false;
      });
  }

  joinToParty(gameId: number): void {
    this.sendingJoinToParty = true;
    this.gameService.getGameInfo(gameId)
      .subscribe(resp => {
        this.joinToGame({
          gameId: resp.game.id,
          firstPlayer: resp.game.first_player,
          secondPlayer: resp.game.second_player,
          currentTurn: resp.game.current_turn,
          boxes: resp.gameBoxes
        });
        this.sendingJoinToParty = false;
      }, err => {
        Swal.fire('Error', err.error.message, 'error');
        this.sendingJoinToParty = false;
      });
  }

  joinToGame(dataForGame): void {
    localStorage.setItem('gameData', JSON.stringify(dataForGame));
    this.router.navigateByUrl('/game/board');
  }

  showGameInput(): void {
    this.openInp = !this.openInp;
  }

}
