import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/getToken', {});
  }
}