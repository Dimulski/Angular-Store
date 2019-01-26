import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() games: Game[];
}
