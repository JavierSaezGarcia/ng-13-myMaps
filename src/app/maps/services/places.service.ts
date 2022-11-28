import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { PlacesResponse, Feature } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( private placesApi: PlacesApiClient,
              private mapService: MapService ) {
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

  getPlacesByQuery( query: string = '' ) {
  // TODO: evaluar cuando el query es un string vacio

    if( query.length === 0 ){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    this.isLoadingPlaces = true;
    
    if( !this.userLocation ) throw Error('No hay userLocation');

    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe( resp => {
         this.isLoadingPlaces = false;
         this.places = resp.features;

         this.mapService.createMarkersFromPlaces(  this.places, this.userLocation! );
      } );

  }

  deletePlaces() {
    this.places = [];
  }

}
