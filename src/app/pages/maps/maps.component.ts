import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { Stadium } from '../../interfaces/stadium';
import { StadiumService } from '../../services/stadium.service';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit{

  public map!: mapboxgl.Map;
  stadiums: Stadium[] = [];

  constructor(private _stadiumService: StadiumService) {}


  ngOnInit() {

    this.initializeMap();
    this.loadStadiums();


  }

  initializeMap(): void {
    mapboxgl.accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [9.1185503, 45.4784638],
      zoom: 4 
    });
  }

  loadStadiums(): void {
    this._stadiumService.getStadiums().subscribe(stadiums => {
      this.stadiums = stadiums;
      console.log(this.stadiums)
      this.addStadiumMarkers();
    });
  }

  addStadiumMarkers(): void {
    this.stadiums.forEach(stadium => {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([stadium.longitude, stadium.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setText(`${stadium.name}, ${stadium.city}, ${stadium.country}`))
        .addTo(this.map);
    });
  }

}
