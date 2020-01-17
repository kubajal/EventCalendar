import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MyEvent, MyEventAttrs} from "./event";

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventControllerPath: string = "event";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  getEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEventAttrs[]>(this.baseUrl + this.eventControllerPath).pipe(
      map((result) => result.map((myEventAttrs) => new MyEvent(myEventAttrs)))
    );
  }

  createEvent(data: MyEventAttrs): Observable<MyEvent> {
    return this.http.post<MyEventAttrs>(this.baseUrl + this.eventControllerPath, data).pipe(
      map((myEventAttrs) => new MyEvent(myEventAttrs))
    );
  }
}