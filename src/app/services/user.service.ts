import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  searchUser(firstname: string, surname: string, firstname2: string, surname2: string): Observable<User[]> {
    return this.http.post<User[]>('http://localhost:8080/api/user/search', {
      "firstname": firstname, "surname": surname, "firstname2": firstname2, "surname2": surname2,
    });
  }
}
