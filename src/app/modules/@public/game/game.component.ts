import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: []
})
export class GameComponent implements OnInit {

  public gameData;
  public currentTurn: number;
  public markCurrent: string;
  public sending: boolean;
  public gameOver: boolean;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    const data = localStorage.getItem('gameData');
    this.gameData = JSON.parse(data);
    this.currentTurn = this.gameData.currentTurn;
    this.checkMarkToUse();
  }

  selectedBoxes(box: number): void {
    this.sending = true;
    this.gameData.boxes[`box_${ box }`].value = this.markCurrent;
    this.gameService.playGame(this.gameData.gameId, { player: this.currentTurn, box_selected: box })
      .subscribe(resp => {
        if (resp) {
          localStorage.setItem('gameData', JSON.stringify({
            gameId: this.gameData.gameId,
            firstPlayer: this.gameData.firstPlayer,
            secondPlayer: this.gameData.secondPlayer,
            boxes: this.gameData.boxes
          }));
          this.checkCurrentUser();
        }
        this.sending = false;
      });
  }

  logout(): void {
    this.gameService.logout();
  }

  checkCurrentUser(): void {
    if (this.currentTurn === this.gameData.firstPlayer.id) {
      this.currentTurn = this.gameData.secondPlayer.id;
      this.markCurrent = 'O';
    } else {
      this.currentTurn = this.gameData.firstPlayer.id;
      this.markCurrent = 'X';
    }
  }

  checkMarkToUse(): void {
    if (this.currentTurn === this.gameData.firstPlayer.id) {
      this.markCurrent = 'X';
    } else {
      this.markCurrent = 'O';
    }
  }

}
