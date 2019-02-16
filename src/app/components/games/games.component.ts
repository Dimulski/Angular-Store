import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[];

  constructor(db: AngularFirestore) {
    db.collection('/games').valueChanges().subscribe((games) => {
      this.games = games;
    })
  }

  ngOnInit() { }
}
