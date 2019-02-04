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
  cover: string;
  slide: string;
  slideNum: number;
  inStock: boolean;

  constructor(private db: AngularFirestore, private addGameService: AddGameService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.addGameService.addField();
  }

  addPost() {
    var gameObject = {
      'name': this.name || "",
      'product_id': this.productId || "",
      'price': this.price || 0,
      'developer': this.developer || "",
      'description': this.description || "",
      'cover': this.cover || "",
      'slide': this.slide || "",
      'in_stock': this.inStock || false
    }
    if (typeof this.slideNum !== 'undefined') {
      gameObject['slide_num'] = this.slideNum;
    } 

    var gameId = this.name.trim().replace(/\s+/g, '-').toLowerCase();
    this.db.collection('games').doc(gameId).set(gameObject);
  }
}
