// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendUrl = 'https://localhost:7145'; // Update the port if necessary

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/api/Item`)
      .pipe(
        catchError((error: HttpResponse<any>) => {
          return throwError(error);
        })
      );
  }

  editItem(code: string, updatedItem: any): Observable<any> {
    const editUrl = `${this.backendUrl}/api/Item/api/Item/update/${code}`;
    return this.http.put(editUrl, updatedItem, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError((error: HttpResponse<any>) => {
          return throwError(error);
        })
      );
  }

  deleteItem(code: string): Observable<any> {
    const deleteUrl = `${this.backendUrl}/api/Item/api/Item/delete/${code}`;
    return this.http.delete(deleteUrl, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError((error: HttpResponse<any>) => {
          return throwError(error);
        })
      );
  }

  addItem(newItem: any): Observable<any> {
    const addUrl = `${this.backendUrl}/api/Item/add`;
    return this.http.post(addUrl, newItem, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError((error: HttpResponse<any>) => {
          return throwError(error);
        })
      );
  }
}
