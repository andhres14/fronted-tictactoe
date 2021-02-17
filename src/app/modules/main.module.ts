import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { GameComponent } from './@public/game/game.component';
import { InitComponent } from './@public/init/init.component';
import { MainComponent } from './main.component';
import { PlayerNameComponent } from './@public/components/player-name.component';


@NgModule({
  declarations: [ GameComponent, InitComponent, MainComponent, PlayerNameComponent ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class MainModule {
}
