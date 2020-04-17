import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})



export class MapComponent implements OnInit {

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 13,
    minZoom: 8,
  }
  // addMarker() {
  //   this.markers.push({
  //     position: {
  //       lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //       lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //     },
  //     label: {
  //       color: 'red',
  //       text: 'Marker label ' + (this.markers.length + 1),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     options: { animation: google.maps.Animation.BOUNCE },
  //   })
  // }


  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(position => {
      this.center = {

        lat: 35.574340,
        lng: -97.545930

        // lat: position.coords.latitude,
        // lng: position.coords.longitude
      }
    // })
  }
}






// export class MapComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }
// }