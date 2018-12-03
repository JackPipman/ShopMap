import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Shop } from '../../../models/shop.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'jp-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private storage: StorageService) { }

  @Input() products: Product[];
  @Output() onProductAdded = new EventEmitter<Product>();

  newProductId: number;

  shopId: any = this.route.snapshot.paramMap.get('id');

  visibility: boolean = false;

  newProductForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit() {
    this.newProductId = this.products.length;
    this.storage.getProducts().subscribe((products: Product[]) => {
      this.newProductId = products.length;
    });

    if (this.route.snapshot.paramMap.get('id') == 'empty') {
      this.products = [];
      this.storage.getShops().subscribe((shops: Shop[]) => {
        this.shopId = shops.length + 1;
      })
    }  	
  }

  newProductOpen() {
  	this.visibility = true;
  }

  newProductClose() {
  	this.visibility = false;
  }

  addProduct(){
    this.storage.getShops().subscribe((shops: Shop[]) => {
      let newProduct: Product = {
      name: this.newProductForm.value.name,
      price: this.newProductForm.value.price,
      description: this.newProductForm.value.description,
      shopId: this.shopId,
      id: this.newProductId
      };
      this.products.push(newProduct);
      this.onProductAdded.emit(newProduct);
    this.newProductId++;
    console.log(this.newProductId);
    this.newProductForm.reset();
    this.newProductClose();
    })

  }

}
