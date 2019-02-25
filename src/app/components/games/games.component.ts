import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[];
  genres: string[];
  genresGames: any[];
  p: { [id: string]: number} = {};

  constructor(db: AngularFirestore) {
    db.collection('/games').valueChanges().subscribe((games) => {
      this.games = games;
    });

    this.genres = [];
    this.genresGames = [];
    db.collection('/genres').snapshotChanges().subscribe((genres) => { // gets genres, fills each genre with games
      genres.forEach(genre => {
        let genreName = genre.payload.doc.id.replace(/\s+/, '-');
        this.genres.push(genreName);
        if (this.genresGames[genreName] == undefined) {
          this.genresGames[genreName] = [];
        }
        this.genresGames[genreName].push(this.games.filter(game => {
          return game.genres.includes(genreName.replace(/-/, ' '));
        }));
      });
    });
  }

  ngOnInit() { }
}
