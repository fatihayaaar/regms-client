import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    private API = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    get(url: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.http.get(this.API + url).pipe(map(response => {
            if (callback) callback(response);
            return response;
        }), catchError(error => {
            if (errorCallback) errorCallback(error);
            throw error;
        }));
    }

    post(endpoint: string, data: any | null, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(this.API + endpoint, data, {headers, responseType: 'text'}).pipe(map(response => {
            if (callback) callback(response);
            return response;
        }), catchError(error => {
            if (errorCallback) errorCallback(error);
            throw error;
        }));
    }

    put(endpoint: string, data: any | null, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.put(this.API + endpoint, data, {headers, responseType: 'text'}).pipe(map(response => {
            if (callback) callback(response);
            return response;
        }), catchError(error => {
            if (errorCallback) errorCallback(error);
            throw error;
        }));
    }

    delete(url: string, callback?: (response: any) => void, errorCallback?: (error: any) => void) {
        return this.http.delete(this.API + url).pipe(map(response => {
            if (callback) callback(response);
            return response;
        }), catchError(error => {
            if (errorCallback) errorCallback(error);
            throw error;
        }));
    }
}