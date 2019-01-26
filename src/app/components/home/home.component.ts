import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games: Game[];

  constructor() { }

  ngOnInit() {
    this.games = [
      new Game("Dark Souls 3", "$29.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots1/D_Soul_III-180x180.jpg"),
      new Game("Battlefield 1 Revolution", "$59.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots3/BF1Revolution_pc-180x180.jpg"),
      new Game("Far Cry 5 Deluxe Edition", "$69.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots3/FarCry5Deluxe_pc-180x180.jpg"),
      new Game("Project Cars 2", "$35.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots2/prcars%202%20pc-180x180.jpg"),
      new Game("The Evil Withing 2", "$59.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots2/Evil_With_2_PC-180x180.jpg"),
      new Game("Dishonored: Death of the Outsider", "$29.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots2/Dishn_Outsider_PC-180x180.jpg"),
      new Game("Fallout 4 Game of the Year Edition", "$35.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots2/F4_GOTY_PC-180x180.jpg"),
      new Game("Nier: Automata", "$59.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots2/Nier_automataPC-180x180.jpg"),
      new Game("The Elder Scrolls Online: Morrowind", "$59.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots1/TESO_MOrrowind_PC-180x180.jpg"),
      new Game("The Witcher 3: Wild Hunt Game Of The Year Edition", "$19.99", "http://www.pulsar.bg/image/cache/data/products4/Packshots1/Witch_GOTY_PC-180x180.jpg")
    ]
  }

}
