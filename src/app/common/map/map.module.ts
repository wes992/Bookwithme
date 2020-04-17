import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    GoogleMapsModule
  ],
  exports: [
    MapComponent
  ],
  providers: [],
})
export class MapModule { }
