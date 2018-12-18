import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  baseUrl: string = `https://api.spotify.com/v1/artists/`;

  constructor(private httpClient: HttpClient) {
  }

  getBand(bandId: string) {
    const authtoken = localStorage.getItem('authtoken');
    const url = this.baseUrl + bandId;
    return this.httpClient.get(url, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });
  }

  getAlbums(bandId: string) {
    const authtoken = localStorage.getItem('authtoken');
    const url = this.baseUrl + bandId + '/albums?offset=0&include_groups=album&market=GB&limit=50';
    return this.httpClient.get(url, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });
  }
}
