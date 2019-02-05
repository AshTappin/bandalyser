import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor(private httpClient: HttpClient) {
  }

  getAuthToken() {
    // const url = 'http://localhost:8000/api/authtoken';
    const url = '/api/authtoken';
    this.httpClient.get(url)
      .toPromise().then((body) => {
      const authtoken = body['authtoken'];
      console.log('our auth token', authtoken);
      localStorage.setItem('authtoken', authtoken);
    });
  }
}
