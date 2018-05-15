import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CalendarService implements Resolve<any>
{

    events: any;
    onEventsUpdated = new Subject<any>();
    urlMain = 'http://localhost:5000/api/events';

    constructor(private http: HttpClient)
    {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getEvents()
    {
        return new Promise((resolve, reject) => {

            this.http.get(`${this.urlMain}`)
                .subscribe((response: any) => {
                    this.events = response.data;
                    console.log(response.data);
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    updateEvents(events)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/calendar/events', {
                id  : 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }

}
