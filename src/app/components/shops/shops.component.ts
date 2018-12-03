import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';
import { Product } from '../../models/product.model';
import { StorageService} from '../../services/storage.service';

@Component({
  selector: 'jp-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  shops: Shop[] = [];
  products: Product[] = [];

  ngOnInit() {

    if (!(window.localStorage.shops&&window.localStorage.products)) {

    	this.storageService.initShopsStorage().subscribe(() => {
    		console.log("Init ShopStorage Done!");
    	});

    	this.storageService.initProductsStorage().subscribe(() => {
    		console.log("Init ShopStorage Done!");
    	});

    }

  	this.storageService.getShops().subscribe((shops: Shop[]) => {
  		this.shops = shops;
  		console.log(this.shops);
  	});

  	this.storageService.getProducts().subscribe((products: Product[]) => {
  		this.products = products;
  		console.log(this.products);
  	});

  }

}
