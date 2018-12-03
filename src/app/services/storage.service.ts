import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Shop } from '../models/shop.model';
import { Product } from '../models/product.model';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class StorageService {
	constructor(protected localStorage: LocalStorage) {
	}
		shops: Shop[] = [
	  		{name: "Соседи", adress: "Минск, Жуковского, 9", workingHours: "C 8 до 24", id: 0},
	  		{name: "Виталюр", adress: "Минск, Маяковского, 4", workingHours: "C 8 до 24", id: 1},
	  		{name: "Евроопт", adress: "Минск, Ленина, 3", workingHours: "C 8 до 24", id: 2},
	  		{name: "Рублевский", adress: "Минск, Толстого, 9", workingHours: "C 8 до 24", id: 3},
	  		{name: "Домашний", adress: "Минск, Сурганова, 9", workingHours: "C 8 до 24", id: 4}
  		];

		products: Product[] = [
			{name: "Колбаса", price: 100, description: "Какое то описание", shopId: "0", id: 0},
			{name: "Яйца", price: 100, description: "Какое то описание", shopId: "1", id: 1},
			{name: "Молоко", price: 100, description: "Какое то описание", shopId: "2", id: 2},
			{name: "Сыр", price: 100, description: "Какое то описание", shopId: "3", id: 3},
			{name: "Рыба", price: 100, description: "Какое то описание", shopId: "4", id: 4},
			{name: "Пицца", price: 100, description: "Какое то описание4", shopId: "0", id: 5},
			{name: "Творог", price: 100, description: "Какое то описание", shopId: "1", id: 6},
			{name: "Сигареты", price: 100, description: "Какое то описание", shopId: "2", id: 7},
			{name: "Спички", price: 100, description: "Какое то описание", shopId: "3", id: 8},
			{name: "Хлеб", price: 100, description: "Какое то описание", shopId: "4", id: 9},
			{name: "Батон", price: 100, description: "Какое то описание", shopId: "0", id: 10},
			{name: "Сосиски", price: 100, description: "Какое то описание", shopId: "1", id: 11},
			{name: "Кефир", price: 100, description: "Какое то описание", shopId: "2", id: 12},
			{name: "Презервативы", price: 100, description: "Какое то описание", shopId: "3", id: 13},
			{name: "Зефир", price: 100, description: "Какое то описание", shopId: "4", id: 14},
			{name: "Конфеты", price: 100, description: "Какое то описание", shopId: "0", id: 15},
			{name: "Печенье", price: 100, description: "Какое то описание", shopId: "1", id: 16}
		];

	initShopsStorage() {
		return this.localStorage.setItem('shops', this.shops);
	}

	getShops(): Observable<any> {
		return this.localStorage.getItem('shops')
	}

	addShops(shops): Observable<any> {
		return this.localStorage.setItem('shops', shops);
	}

	initProductsStorage(): Observable<any> {
		return this.localStorage.setItem('products', this.products);
	}

	getProducts(): Observable<any> {
		return this.localStorage.getItem('products');
	}

	addProducts(prods): Observable<any> {
		return this.localStorage.setItem('products', prods);
	}

	updateData(newProducts: Product[], shop: Shop) {
		return new Promise((resolve, reject) => {
				this.getProducts().subscribe(products => {
					let updatedProds = products.concat(newProducts);
					this.addProducts(updatedProds).subscribe(() => {
						console.log("Products added");
						this.getShops().subscribe(shops => {
							let updatedShops = shops;
							let index = shops.findIndex((s: Shop, idx) => {
								return shop.id == s.id;
							});
							if (index != -1) {
								updatedShops[index] = shop;
							}
							else {
								updatedShops.push(shop);
							}

							this.addShops(updatedShops).subscribe(() => {
								console.log("Shops added");
								resolve();
							});
						})
					})
				})
				
		})
	}
}

