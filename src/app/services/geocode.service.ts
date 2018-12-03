import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GeocodeService {

	constructor() {}

  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  geocodeAddress(address, map) {
    this.geocoder.geocode({address:address}, (results,status) =>
      { 
        if (status == google.maps.GeocoderStatus.OK) {
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          this.createMarker(address, lat, lng, map);
        }
      }
    );
  }

  createMarker(add,lat,lng, map) {
    var infowindow = new google.maps.InfoWindow();
    var contentString = add;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      map: map
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(contentString); 
      infowindow.open(map, marker);
      setTimeout(() => {infowindow.close();}, 3000);
    });

  }

}

