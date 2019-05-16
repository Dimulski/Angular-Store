import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart.service';
import { Game } from 'src/app/models/game';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public gameObservable: Observable<Game>;

  constructor(route: ActivatedRoute, public db: AngularFirestore, public cartService: CartService) {
    let gamePath = route.snapshot.paramMap.get('name');
    const gameRef: AngularFirestoreDocument<Game> = this.db.doc('games/' + gamePath);
    this.gameObservable = gameRef.valueChanges();
    this.gameObservable.pipe(take(1)).subscribe(game => {
      game.views += 1;
      gameRef.update(game);
    });
  }

  ngOnInit() { }

  public getSlideNumbers(galleryLength: number): any[] {
    let slideNumbers = [];
    let numberOfSlides = Math.ceil(galleryLength / 4)
    for (let i = 0; i < numberOfSlides; i++) {
      slideNumbers.push(i);
    }

    return slideNumbers;
  }

  public getSlideThumbnails(slideNumber: number, gallery: any[]): any[] {
    let slideThumbnails = [];
    let start = slideNumber * 4
    for (let i = start; i < start + 4; i++) {
      if (gallery[i] != undefined) {
        slideThumbnails.push(gallery[i])
      }
    }

    return slideThumbnails;
  }
}
