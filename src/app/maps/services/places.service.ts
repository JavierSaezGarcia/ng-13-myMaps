import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

 // public userLocation?: [number, number];

  public userLocation: [number, number] = [-0.23089497607199103, 39.67037673902686];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
   }

  getUserLocation(): Promise<[number,number]> {
    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords } ) => {
          this.userLocation = [ coords.longitude , coords.latitude ];
          resolve(this.userLocation);
        },
        ( err ) => {
          alert("No se pudo obtener la geolocalizacion")
          console.log(err);
          reject();
        }
      );

    });
  }

}
