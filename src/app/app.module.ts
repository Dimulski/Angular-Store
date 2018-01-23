import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { TopTenComponent } from './components/top-ten/top-ten.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components//shared/header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { GamesComponent } from './components/games/games.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeaturedComponent,
    TopTenComponent,
    FooterComponent,
    HeaderComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
