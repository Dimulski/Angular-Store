import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  // I think IoC is needed here; instead of this component calling /games it should get it from a service possibly
  // lesser option would be to just get them from home component
  // featuredGames: Observable<any[]>;

  constructor() {
    // this.featuredGames = db.collection('/games', ref => ref.orderBy('slide_num')).valueChanges();
  }

  ngOnInit() {
  }

  @Input() featuredGames: Observable<any[]>;
}
