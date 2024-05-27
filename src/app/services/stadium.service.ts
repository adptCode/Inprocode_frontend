import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stadium } from '../interfaces/stadium';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  private apiUrl: string = 'http://localhost:3000/api/stadiums';

  constructor(private http: HttpClient) { }

  getStadiums(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(this.apiUrl);
  }

}
