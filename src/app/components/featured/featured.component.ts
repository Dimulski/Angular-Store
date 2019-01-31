import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  // I think IoC is needed here
  featuredGames: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.featuredGames = db.collection('/games', ref => ref.orderBy('slide_num')).valueChanges();
  }

  ngOnInit() {
  }
}
