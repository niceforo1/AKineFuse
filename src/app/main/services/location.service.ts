import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocationService {
  urlProvince: string = 'http://localhost:5000/api/province';
  urlCities: string = 'http://localhost:5000/api/locations';

  constructor(private _http: HttpClient) {}

  getProvinces() {
    return this._http.get(this.urlProvince);
  }

  getCities(province: string) {
    return this._http.get(`${this.urlCities}/${province}`);
  }

}
