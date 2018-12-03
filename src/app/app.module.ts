import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShopdetailsComponent } from './components/shopdetails/shopdetails.component';
import { ShopinfoComponent } from './components/shopdetails/shopinfo/shopinfo.component';
import { ProductsComponent } from './components/shopdetails/products/products.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ShoplistComponent } from './components/shops/shoplist/shoplist.component';
import { ShopmapComponent } from './components/shops/shopmap/shopmap.component';
import { GeocodeService } from './services/geocode.service';
import { StorageService} from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ShopdetailsComponent,
    ShopinfoComponent,
    ProductsComponent,
    ShopsComponent,
    ShoplistComponent,
    ShopmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GeocodeService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
