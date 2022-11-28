import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private deBounceTimer?: NodeJS.Timeout;

  constructor( private placesService: PlacesService ) {}

  onQueryChanged( query: string = '' ){

    if( this.deBounceTimer) clearTimeout( this.deBounceTimer );

    this.deBounceTimer = setTimeout( () => {
      this.placesService.getPlacesByQuery( query );

    },350);

   
  }

}
