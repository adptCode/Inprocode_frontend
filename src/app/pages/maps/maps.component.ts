import { Component, OnDestroy, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
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

  map!: mapboxgl.Map;



  constructor(private _markerService: MarkersService) {}

  ngOnInit() {
    this.initializeMap();
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
      const popup = new mapboxgl.Popup().setHTML(`${event.lngLat}`)
      const marker = new mapboxgl.Marker().setLngLat(event.lngLat).setPopup(popup).addTo(this.map);
      marker.togglePopup();
      const {lng, lat } = event.lngLat
      const newMarker: Marker = {
        longitude: lng,
        latitude: lat
      };

      this._markerService.createMarker(newMarker).subscribe({
        next: (response) => {
          console.log('Marker saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving marker:', error);
        }
      });


    });
  }


  clearMarkers() {
    this._markerService.deleteAllMarkers().subscribe({
      next: () => {
        console.log('All markers deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting all markers:', error);
      }
    })
  }


}


