import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: []
})
export class GameComponent implements OnInit, OnDestroy {

  public gameData;
  public currentTurn: number;
  public markCurrent: string;
  public sending: boolean;
  public sendingReset: boolean;
  public playerNameToEdit: boolean;
  public gameOver: boolean;
  public winnerId: number;
  public winnerBoxes = {};

  constructor(private gameService: GameService) {
    this.sending = false;
    this.sendingReset = false;
    this.gameOver = false;
  }

  ngOnInit(): void {
    const data = localStorage.getItem('gameData');
    this.gameData = JSON.parse(data);
    this.currentTurn = this.gameData.currentTurn;
    this.checkMarkToUse();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('gameData');
  }

  selectedBoxes(box: number): void {
    if (this.sending || this.gameOver || this.gameData.boxes[`box_${ box }`].value) {
      return;
    }

    this.sending = true;
    this.gameData.boxes[`box_${ box }`].value = this.markCurrent;
    this.gameService.playGame(this.gameData.gameId, { player: this.currentTurn, box_selected: box })
      .subscribe(resp => {
        this.checkCurrentUser();
        this.checkMarkToUse();
        console.log(this.currentTurn);

        localStorage.setItem('gameData', JSON.stringify({
          gameId: this.gameData.gameId,
          firstPlayer: this.gameData.firstPlayer,
          secondPlayer: this.gameData.secondPlayer,
          boxes: this.gameData.boxes,
          currentTurn: this.currentTurn,
          isGameOver: false
        }));
        this.sending = false;

        // winner
        if (resp.gameOver && resp.winnerId) {
          this.winnerId = resp.winnerId;
          const userWinner = this.winnerId === this.gameData.firstPlayer.id
            ? this.gameData.firstPlayer.nick
            : this.gameData.secondPlayer.nick;
          Swal.fire('Felicitaciones !!', `${ userWinner } eres el ganador de esta partida`, 'success');
          this.gameOver = true;
          this.winnerBoxes = resp.boxWinners;
        }

        // not winner - game over
        if (resp.gameOver && !this.winnerId) {
          Swal.fire('Información', resp.message, 'info');
          this.gameOver = true;
        }

      }, err => {
        console.log(err);
        Swal.fire('Bad Request', err.error.message, 'error');
        this.checkCurrentUser();
        this.checkMarkToUse();
        this.sending = false;
      });
  }

  resetGame(): void {
    this.gameOver = false;
    this.winnerId = null;
    this.winnerBoxes = {};
    this.sendingReset = true;

    this.gameService.resetGame({
      first_player: this.gameData.firstPlayer.id,
      second_player: this.gameData.secondPlayer.id,
    }).subscribe(resp => {
      const newData = {
        gameId: resp.gameId,
        firstPlayer: resp.firstPlayer,
        secondPlayer: resp.secondPlayer,
        currentTurn: resp.currentTurn,
        boxes: resp.gameBoxes,
        isGameOver: false
      };
      console.log(newData);
      localStorage.setItem('gameData', JSON.stringify(newData));
      this.gameData = newData;
      this.sendingReset = false;
      this.checkMarkToUse();
    }, err => {
      Swal.fire('Error', err.error.message, 'error');
      this.sendingReset = false;
    });
  }

  logout(): void {
    this.gameService.logout();
  }

  checkCurrentUser(): void {
    if (this.currentTurn === this.gameData.firstPlayer.id) {
      this.currentTurn = this.gameData.secondPlayer.id;
    } else {
      this.currentTurn = this.gameData.firstPlayer.id;
    }
  }

  checkMarkToUse(): void {
    if (this.currentTurn === this.gameData.firstPlayer.id) {
      this.markCurrent = 'X';
    } else {
      this.markCurrent = 'O';
    }
  }

  changePlayerName(event): void {
    console.log(event);
    if (event) {
      this.playerNameToEdit = false;
      this.gameData.firstPlayer.nick = event;
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
    }
  }

}
