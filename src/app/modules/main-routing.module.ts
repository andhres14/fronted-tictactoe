import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameGuard } from '../core/guards/game.guard';

import { MainComponent } from './main.component';
import { InitComponent } from './@public/init/init.component';
import { GameComponent } from './@public/game/game.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: InitComponent },
      { path: 'app', component: InitComponent },
      { path: 'game', canActivate: [GameGuard], component: GameComponent }
    ]
  }

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MainRoutingModule {
}
