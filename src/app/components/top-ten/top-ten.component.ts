import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {

  @Input() allGames: Observable<any[]>;
  @Input() hotGames: Observable<any[]>;
  @Input() latestGames: Observable<any[]>
  @Input() bestsellerGames: Observable<any[]>

  constructor(public cartService: CartService) { }

  ngOnInit() { }
}
