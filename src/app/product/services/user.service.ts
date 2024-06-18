import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    changeUsername(username: string): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post("localhost:8180/user/v1/change-username", {
            "username": username,
        }, {headers, responseType: 'text'},);
    }
}