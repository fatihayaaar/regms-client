import {Injectable} from "@angular/core";
import {environment} from "../../environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    private API = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    post(endpoint: string, data: any | null) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(this.API + endpoint, data, {headers, responseType: "text",});
    }
}