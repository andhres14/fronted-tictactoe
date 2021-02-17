import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MainRoutingModule } from './modules/main-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
