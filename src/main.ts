import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYmFuYmxlYWMiLCJhIjoiY2xha3pod2J1MDBneDNwdWVoOXU4aG5oeCJ9.rYTdVOD3Tn76tXmqFdLyFw';

if( !navigator.geolocation ){
  alert('Navegador no soporta localizacion');
  throw new Error("Navegador no soporta la geolocation");
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
