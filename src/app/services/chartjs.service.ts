import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dates } from '../interfaces/dates';

@Injectable({
  providedIn: 'root'
})
export class ChartjsService {

  private apiUrl: string = 'http://localhost:3000/api/dates';

  constructor(private http: HttpClient) { }

  getDates(): Observable<Dates[]> {
    return this.http.get<Dates[]>(this.apiUrl)
  }
}
