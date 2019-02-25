import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { HomeComponent } from './components/home/home.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'add-game', component: AddGameComponent },
  { path: 'game/:name', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
