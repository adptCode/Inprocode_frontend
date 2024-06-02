import { Component, OnDestroy, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { Marker } from '../../interfaces/markers';
import { MarkersService } from '../../services/markers.service';


@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.css'
})
export class MapboxComponent implements OnInit, OnDestroy {

  map!: mapboxgl.Map;
  predefinedMarkers: mapboxgl.Marker[] = [];
  dynamicMarkers: mapboxgl.Marker[] = [];
  allMarkers: Marker[] = [];
  selectedCategories: Set<string> = new Set();



  constructor(private _markerService: MarkersService) {}

  ngOnInit() {
    this.initializeMap();
    this.loadPredefinedMarkers();
  }

  ngOnDestroy(): void {


    this.clearDynamicMarkers();
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
      const {lng, lat } = event.lngLat;
      const newMarker: Marker = {
        longitude: lng,
        latitude: lat
      };
      const marker = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(this.map);
      this.dynamicMarkers.push(marker);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Dynamic Marker</h3><p>Coordinates: ${lng}, ${lat}</p>`)

      marker.setPopup(popup).togglePopup();




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

  loadPredefinedMarkers() {
    this._markerService.getMarkers().subscribe({
      next: (markers) => {
        this.allMarkers = markers;
        this.displayMarkers(markers);
      },
      error: (error) => {
        console.error('Error loading predefined markers:', error);
      }
    });
  }

  toggleCategory(event: any, category: string) {
    if (event.target.checked) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }
    this.filterMarkers();
  }

  filterMarkers() {
    this.predefinedMarkers.forEach(marker => marker.remove());
    this.predefinedMarkers = [];

    const filteredMarkers = this.allMarkers.filter((marker:any) =>
      this.selectedCategories.size === 0 || this.selectedCategories.has(marker.category)
    );

    this.displayMarkers(filteredMarkers);
  }

  displayMarkers(markers: Marker[]) {
    markers.forEach(markerData => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = '100%';
      const marker = new mapboxgl.Marker()
        .setLngLat([markerData.longitude, markerData.latitude])
        .addTo(this.map);
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${markerData.name}</h3><p>Coordinates: ${markerData.longitude}, ${markerData.latitude}</p><p>Category: ${markerData.category}</p>`
        );
        marker.setPopup(popup);
        marker.getElement().addEventListener('mouseenter', () => popup.addTo(this.map));
        marker.getElement().addEventListener('mouseleave', () => popup.remove());


      this.predefinedMarkers.push(marker);
    });
  }

  clearDynamicMarkers() {
    this.dynamicMarkers.forEach(marker => marker.remove());
    this.dynamicMarkers = [];
    this._markerService.deleteAllMarkers().subscribe({
      next: () => {
        console.log('All dynamic markers deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting all markers:', error);
      }
    });
  }

}

