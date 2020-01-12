import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }
//properties needed
  private baseUrlLogin = 'api/Login';
//communicate with web api
  Login(userData) {
    return this.http.post<any>(this.baseUrlLogin, userData).pipe(result => {
        if (result != null) {
          console.log('We sent a message to our Controller API. It       works');
        }
        return result;
        })
      
  }


  GetMovies() {
    let UrlMovies = 'api/Movie';
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('tokenJWT')
    });
    return this.http.get(UrlMovies, { headers: reqHeader });

  }
  
}