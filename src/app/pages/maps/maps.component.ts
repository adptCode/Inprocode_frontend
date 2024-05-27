import { Component, OnDestroy, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { Stadium } from '../../interfaces/stadium';
import { StadiumService } from '../../services/stadium.service';
import { Marker } from '../../interfaces/markers';
import { MarkersService } from '../../services/markers.service';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit, OnDestroy{

  public map!: mapboxgl.Map;
  stadiums: Stadium[] = [];
  markers: Marker[] = [];
  mapMarkers: mapboxgl.Marker[] = [];
  markerName: string = '';

  constructor(private _stadiumService: StadiumService, private _markerService: MarkersService) {}

  ngOnInit() {

    this.initializeMap();
    //this.loadStadiums();
    this.loadMarkers();
  }

  ngOnDestroy(): void {
    this.clearMarkers();
  }

  initializeMap(): void {
    mapboxgl.accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.1745004, 41.3907372],
      zoom: 12
    });

    this.map.on('click', (event) => {
      const coordinates = event.lngLat;
      const name = prompt("Enter the name for the marker:");
      if (name) {
        this.addMarker({ latitude: coordinates.lat, longitude: coordinates.lng, name });
      }
    });
  }

  /*
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

  */

loadMarkers(): void {
  this._markerService.getMarkers().subscribe(markers => {
    this.markers = markers;
    this.addExistingMarkers();
  });
}

addExistingMarkers(): void {
  this.markers.forEach(marker => {
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([marker.longitude, marker.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(marker.name))
      .addTo(this.map);
  });
}

addMarker(marker: Partial<Marker>): void {
  this._markerService.createMarker(marker).subscribe(newMarker => {
    this.markers.push(newMarker);
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([newMarker.longitude, newMarker.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(newMarker.name))
      .addTo(this.map);
  });
}

clearMarkers(): void {
  this.mapMarkers.forEach(marker => marker.remove());
    this.mapMarkers = [];
    this._markerService.deleteAllMarkers().subscribe(() => {
      this.markers = [];
    });
  }
}


