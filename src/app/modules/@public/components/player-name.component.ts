import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../../core/services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player-name',
  template: `
    <div class="input-group mb-3">
      <input type="text" class="form-control" maxlength="20"
             [(ngModel)]="playerName"
             placeholder="Player Name"
             aria-label="Player Name"
             aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary"
                (click)="changePlayerName()"
                [disabled]="sending"
                type="button"><i class="fa fa-edit"></i></button>
      </div>
    </div>
  `,
  styles: []
})
export class PlayerNameComponent {

  @Input() playerId: number;
  @Input() gameId: number;
  @Output() playerNameChanged: EventEmitter<string> = new EventEmitter();
  playerName: string;
  sending: boolean;

  constructor(private playerService: PlayerService) {
    this.sending = false;
  }

  changePlayerName(): void {
    this.sending = true;
    this.playerService.updatePlayerName(this.gameId, this.playerId, { nick: this.playerName })
      .subscribe(resp => {
        this.playerNameChanged.emit(this.playerName);
        this.sending = false;
      }, err => {
        this.sending = false;
        Swal.fire('Error', err.error.message, 'error');
      });
  }

}
