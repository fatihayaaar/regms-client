import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private registerAPIUrl = 'http://localhost:8180/user/v1/public/register';

    constructor(private http: HttpClient) {
    }

    register(user: any): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.registerAPIUrl, {
            "name": user.name,
            "surname": user.surname,
            "uid": user.username,
            "emailAddress": user.mail,
            "password": user.password,
            "gender": "male"
        }, {headers, responseType: 'text'},);
    }
}