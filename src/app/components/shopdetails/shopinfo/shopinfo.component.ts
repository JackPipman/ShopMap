import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shop } from '../../../models/shop.model';
import { FormGroup, FormControl } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'jp-shopinfo',
  templateUrl: './shopinfo.component.html',
  styleUrls: ['./shopinfo.component.scss']
})
export class ShopinfoComponent implements OnInit {

  constructor(private storage: StorageService) { }

  @Input() shop: Shop;
  @Output() onShopEdited = new EventEmitter<Shop>();

  shopId: number;

  shopInfoForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    hours: new FormControl('')
  });


  ngOnInit() {
  	this.shopInfoForm.setValue({
  		name: this.shop.name,
  		address: this.shop.adress,
  		hours: this.shop.workingHours
  	});

  	if (this.shop.id) {
  		this.shopId = this.shop.id;
  	}
  	else {
	  	this.storage.getShops().subscribe((shops: Shop[]) => {
	  		this.shopId = shops.length +1;
	  	});
  	}
  }

  saveChanges() {
  	var shopData = {		
  		name: this.shopInfoForm.value.name,
  		adress: this.shopInfoForm.value.address,
  		workingHours: this.shopInfoForm.value.hours,
  		id: this.shopId
  	}
  	this.onShopEdited.emit(shopData);
  	this.shopInfoForm.reset();
  }

}
