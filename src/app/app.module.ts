import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TopTenComponent } from './components/top-ten/top-ten.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { GamesComponent } from './components/games/games.component';
import { HomeComponent } from './components/home/home.component';
import { TopbarComponent } from './components/shared/topbar/topbar.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; // redundant currently
import { AngularFireStorageModule } from 'angularfire2/storage'; // redundant currently

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AddGameComponent } from './components/add-game/add-game.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { GameComponent } from './components/game/game.component';
import { ToLowerHyphenPipe } from './pipes/to-lower-hyphen.pipe';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopTenComponent,
    FeaturedComponent,
    GamesComponent,
    HomeComponent,
    TopbarComponent,
    AddGameComponent,
    GameComponent,
    ToLowerHyphenPipe,
    LoginComponent,
    UserProfileComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    NgxPaginationModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
