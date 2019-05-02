import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allGames: Observable<any[]>;
  featuredGames: Observable<any[]>;
  hotGames: Observable<any[]>;
  latestGames: Observable<any[]>
  bestsellerGames: Observable<any[]>
  
  constructor(db: AngularFirestore) {
    this.allGames = db.collection('/games', ref => ref.limit(10)).valueChanges();
    this.hotGames = db.collection('/games', ref => ref.orderBy('views', 'desc').limit(10)).valueChanges();
    this.featuredGames = db.collection('/games', ref => ref.orderBy('slide_num')).valueChanges();
    this.latestGames = db.collection('/games', ref => ref.orderBy('createdAt').limit(10)).valueChanges();
    this.bestsellerGames = db.collection('/games', ref => ref.orderBy('purchases', 'desc').limit(10)).valueChanges();
  }

  ngOnInit() { }
}
