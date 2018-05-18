import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService implements Resolve<any> {
  urlMain = 'http://localhost:5000/api/dashboard';
  widgetsData: any[];

  constructor(private _http: HttpClient) {}

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getDashboardHome()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getDashboardHome(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.urlMain + '/home').subscribe((response: any) => {
        this.widgetsData = response;
        resolve(response);
      }, reject);
    });
  }
}
