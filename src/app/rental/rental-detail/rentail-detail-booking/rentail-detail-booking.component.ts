import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';

@Component({
  selector: 'bwm-rentail-detail-booking',
  templateUrl: './rentail-detail-booking.component.html',
  styleUrls: ['./rentail-detail-booking.component.scss']
})
export class RentailDetailBookingComponent implements OnInit {
 
  @Input() price: number;
  @Input() bookings: Booking[];

  daterange: any = {};
  bookedDates: any[] = [];

  options: any = {
    alwaysShowCalendars: false,
    datesDisabled: this.checkForInvalidDates,
  }

  constructor(public helper: HelperService) { }
  
  ngOnInit() {
    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    return true;
  }

  private getBookedOutDates() {
    if (this.bookings && this.bookings.length > 0) {
      this.bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getDateRange(booking.startAt, booking.endAt);
        this.bookedDates.push(...dateRange);
      });
    }
  }
  
//   // see original project for full list of options
//   // can also be setup using the config service to apply to multiple pickers
//   options: any = {
//     locale: { format: 'MM-DD-YYYY' },
//     alwaysShowCalendars: false,
//     opens: 'left'
//   };
 
//   selectedDate(value: any, datepicker?: any) {
//     // this is the date  selected
//     console.log(value);
 
//     // any object can be passed to the selected event and it will be passed back here
//     datepicker.start = value.start;
//     datepicker.end = value.end;
 
//     // use passed valuable to update state
//     this.daterange.start = value.start;
//     this.daterange.end = value.end;
//     this.daterange.label = value.label;
//   }

}