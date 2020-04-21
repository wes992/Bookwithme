import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';


import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
import { environment } from '../../../environments/environment';



@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
            AgmCoreModule.forRoot({
            apiKey: environment.API_KEY,
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
