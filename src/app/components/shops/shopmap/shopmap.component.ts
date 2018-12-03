import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Shop } from '../../../models/shop.model';
import { GeocodeService } from '../../../services/geocode.service';

@Component({
  selector: 'jp-shopmap',
  templateUrl: './shopmap.component.html',
  styleUrls: ['./shopmap.component.scss']
})
export class ShopmapComponent implements OnInit {

  constructor(private geoService: GeocodeService) { }

  @Input() shops: Shop[] = [];

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  //geocoder: google.maps.Geocoder = new google.maps.Geocoder();
  //lat: Number;
  //lng: Number;
  locations: string[] = [];

  ngOnInit() {

  	this.shops.forEach((shop) => {
  		this.locations.push(shop.adress);
  	});

  	var mapProp = {
      center: new google.maps.LatLng(53.907856, 27.556535),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    console.log(this.map);

    this.locations.forEach((location) => {
    	this.geoService.geocodeAddress(location, this.map);
    })
  }

}
