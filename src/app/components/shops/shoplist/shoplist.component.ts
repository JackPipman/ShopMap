import { Component, OnInit, Input } from '@angular/core';
import { Shop } from '../../../models/shop.model';


@Component({
  selector: 'jp-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.scss']
})
export class ShoplistComponent implements OnInit {

  constructor() { }

  activeShopId: number;

  @Input() shops: Shop[] = [];

  ngOnInit() {

  }

  activateShop(shop: Shop) {
  	this.activeShopId = shop.id;
    console.log(this.activeShopId);
  }

  addShop() {

  }

}
