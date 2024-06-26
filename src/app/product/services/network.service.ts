import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    private API = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    async get(url: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        const fullUrl = `${this.API}${url}`;
        this.http.get(fullUrl).pipe(
            map(response => {
                if (callback) callback(response);
                return response;
            }),
            catchError(error => {
                if (errorCallback) errorCallback(error);
                return throwError(error);
            })
        ).subscribe();
    }

    post(endpoint: string, data: any | null, callback?: (response: any) => void, errorCallback?: (error: any) => void): Observable<any> {
        const fullUrl = `${this.API}${endpoint}`;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(fullUrl, data, { headers, responseType: "text" }).pipe(
            map(response => {
                if (callback) {
                    callback(response);
                }
                return response;
            }),
            catchError(error => {
                if (errorCallback) {
                    errorCallback(error);
                }
                return throwError(error);
            })
        );
    }

    put(endpoint: string, data: any | null, callback?: (response: any) => void, errorCallback?: (error: any) => void): Observable<any> {
        const fullUrl = `${this.API}${endpoint}`;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.put(fullUrl, data, { headers }).pipe(
            map(response => {
                if (callback) callback(response);
                return response;
            }),
            catchError(error => {
                if (errorCallback) errorCallback(error);
                return throwError(error);
            })
        );
    }

    delete(url: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        this.http.delete(this.API + url).pipe(
            map(response => {
                if (callback) callback(response);
                return response;
            }),
            catchError(error => {
                if (errorCallback) errorCallback(error);
                return throwError(error);
            })
        ).subscribe();
    }
}