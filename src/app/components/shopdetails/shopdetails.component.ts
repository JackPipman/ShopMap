import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Shop } from '../../models/shop.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'jp-shopdetails',
  templateUrl: './shopdetails.component.html',
  styleUrls: ['./shopdetails.component.scss']
})
export class ShopdetailsComponent implements OnInit {

  constructor(private storageService: StorageService, private route: ActivatedRoute,
  private router: Router) { }

  shops: Shop[] = [];
  activeShop: Shop = {name: '', adress: '', workingHours: ''};
  products: Product[];

  addedProducts: Product[] = [];

  ngOnInit() {

  	let id: any = this.route.snapshot.paramMap.get('id');
  	console.log(id);

  	if (id == 'empty') {
  		this.storageService.getProducts().subscribe((products: Product[]) => {
  			this.products = products;
	  		console.log(this.products);
	  	});
  	}
  	else {
	  	this.storageService.getShops().subscribe((shops: Shop[]) => {
	  		this.shops = shops;
	  		this.activeShop = this.shops.find(shop => shop.id == id);
  			console.log('Active shop: ', this.activeShop);
	  	});

	  	this.storageService.getProducts().subscribe((products: Product[]) => {
	  		this.products = products.filter(product => product.shopId == id);
	  		console.log(this.products);
	  	});


  	}
  }

  productAdded(product: Product){
  	this.addedProducts.push(product);
  	console.log(this.addedProducts);
  }

  saveChanges(shop: Shop) {
  	console.log(shop);
  	console.log(this.addedProducts);

  	this.storageService.updateData(this.addedProducts, shop)
  	.then(() => {
  		this.router.navigate(['']);
  		console.log("Success");
  	});
  }

}
