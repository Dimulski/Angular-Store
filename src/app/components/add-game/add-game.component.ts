import { Component, OnInit } from '@angular/core';
import { AddGameService } from './add-game.service';
import { Game } from '../../models/game';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
  providers: [ AddGameService ]
})
export class AddGameComponent implements OnInit {

  name: string;
  productId: string;
  price: number;
  developer: string;
  description: string;
  inStock: boolean;
  slide: string;
  slideNum: number;

  constructor(private db: AngularFirestore, private addGameService: AddGameService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.addGameService.addField();
  }

  addPost() { // ew
    var gameId = this.name.trim().replace(/\s+/g, '-').toLowerCase();
    console.log(gameId);
    this.db.collection('games').doc(gameId).set({
      'name': this.name || "",
      'product_id': this.productId || "",
      'price': this.price || 0,
      'developer': this.developer || "",
      'description': this.description || "",
      'in_stock': this.inStock || false,
      'slide': this.slide || "",
      'slide_num': this.slideNum || -1
    });
  }
  
}
