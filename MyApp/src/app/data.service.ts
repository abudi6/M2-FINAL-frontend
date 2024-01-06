// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendUrl = 'https://localhost:7145'; // Update the port if necessary

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/api/Item`);
  }

  // Add other methods for different API endpoints
}
