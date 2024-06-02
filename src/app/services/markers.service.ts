import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marker } from '../interfaces/markers';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  private apiUrl = 'http://localhost:3000/api/markers';
  private defaultApiUrl = 'http://localhost:3000/api/defaultMarkers';



  constructor(private http: HttpClient) { }

  getMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(this.defaultApiUrl);
  }

  getMarkersByCategories(categories: string[]): Observable<Marker[]> {
    const params = new HttpParams().set('categories', categories.join(','));
    return this.http.get<Marker[]>(`${this.defaultApiUrl}/byCategories`, { params });
  }

  createMarker(marker: Marker): Observable<Marker> {
    return this.http.post<Marker>(this.apiUrl, marker);
  }

  deleteAllMarkers(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/all`);
  }
}


