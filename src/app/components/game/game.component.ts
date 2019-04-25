import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Observable<any>;

  constructor(route: ActivatedRoute, db: AngularFirestore, public cartService: CartService) {
    let gameName = route.snapshot.paramMap.get('name');
    this.game = db.collection('/games').doc(gameName).valueChanges();
  }

  ngOnInit() { }
}
