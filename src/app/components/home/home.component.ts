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
  
  constructor(db: AngularFirestore) {
    this.allGames = db.collection('/games', ref => ref.limit(10)).valueChanges();
    this.featuredGames = db.collection('/games', ref => ref.orderBy('slide_num')).valueChanges();
  }

  ngOnInit() { }
}
