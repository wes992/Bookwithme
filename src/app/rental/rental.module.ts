import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';


import { RentalService } from './shared/rental.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentailDetailBookingComponent } from './rental-detail/rentail-detail-booking/rentail-detail-booking.component';

const routes: Routes = [
    {path: 'rentals', 
        component: RentalComponent,
        children: [
            { path: '', component: RentalListComponent },
            { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }

        ]
    }
  ]

@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentailDetailBookingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot()
    ],
    providers:  [RentalService]    
})


export class RentalModule {}