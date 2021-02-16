import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { InitComponent } from './@public/init/init.component';
import { GameComponent } from './@public/game/game.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: MainComponent,
    children: [
      { path: 'app', component: InitComponent},
      { path: 'game', component: GameComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
