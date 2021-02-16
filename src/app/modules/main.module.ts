import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { GameComponent } from './@public/game/game.component';
import { InitComponent } from './@public/init/init.component';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ GameComponent, InitComponent, MainComponent ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class MainModule {
}
