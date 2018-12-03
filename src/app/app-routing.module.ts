import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShopsComponent } from './components/shops/shops.component';
import { ShopdetailsComponent } from './components/shopdetails/shopdetails.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
	{ path: '', component: ShopsComponent},
    { path: 'detail/:id', component: ShopdetailsComponent},
    { path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
		preloadingStrategy: PreloadAllModules
	})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
