import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';


import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';



@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBsBpZIP0nbH1-cEfnRRQnhAI1n8kaqe0M'
        }),
        CommonModule
    ],
    exports: [
        MapComponent
    ],
    providers: [
        MapService,
        CamelizePipe
    ],
})
export class MapModule { }
