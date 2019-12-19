import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyEvent, MyEventAttrs } from './myEvent';
import { map } from 'rxjs/operators';

const localUrl = 'assets/events.json';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  getEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEventAttrs[]>(localUrl + `/events`).pipe(
      map((data) => data.map((myEventAttrs) => new MyEvent(myEventAttrs)))
    );
  }

  createEvent(data: MyEventAttrs): Observable<MyEvent> {
    return this.http.post<MyEventAttrs>(localUrl + `events`, data).pipe(
      map((myEventAttrs) => new MyEvent(myEventAttrs))
    );
  }

  constructor(private http: HttpClient) {
  }
}
