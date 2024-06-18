import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = 'http://localhost:8180/profile/v1/public/register';

    constructor(private http: HttpClient) {
    }

    changeBiography(user: any): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.apiUrl, {

        }, {headers, responseType: 'text'},);
    }
}