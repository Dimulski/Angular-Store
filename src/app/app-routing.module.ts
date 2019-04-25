import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { HomeComponent } from './components/home/home.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { RegisterComponent } from './components/register/register.component';
import { ModeratorGuard } from './core/moderator.guard';
import { CartComponent } from './components/cart/cart.component';
import { CanAddGuard } from './core/can-add.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'add-game', component: AddGameComponent, canActivate: [CanAddGuard] },
  { path: 'game/:name', component: GameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
