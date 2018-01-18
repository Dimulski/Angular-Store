import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { TopTenComponent } from './components/top-ten/top-ten.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeaturedComponent,
    TopTenComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
