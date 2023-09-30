import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = `${environment.KEYCLOACK}/realms/parcial2/protocol/openid-connect/token`

  constructor(
    private http: HttpClient, //[para hacer peticion]
    private router: Router //[para hacer redireccion]
  ) { }

  login(username: string, password: string){
    const body = `client_id=${environment.CLIENT_ID}&grant_type=password&username=${username}&password=${password}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    });
  }

   //KeyCloak
  logout() {
    //let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let token = localStorage.getItem(environment.TOKEN_NAME);
    if (token) {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
      //this.http.post(`${environment.HOST}/login/logout`, decodedToken.preferred_username).subscribe(() => {
      //    sessionStorage.clear();
      this.http.post(`${environment.HOST}/login/logout`, decodedToken.preferred_username).subscribe(() => {
        localStorage.clear();
        this.router.navigate(['login']);
        });
    }else{
      //sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
  isLogged(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null
  }

}