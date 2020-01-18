import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MyEvent, MyEventAttrs} from "./event";
import { CRUDResponse } from './CRUDResponse';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('EVENT_CONTROLLER') private eventControllerPath: string) {
    this.baseUrl = baseUrl;
  }
  
  getEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEventAttrs[]>(this.baseUrl + this.eventControllerPath).pipe(
      map((result) => result.map((myEventAttrs) => new MyEvent(myEventAttrs)))
    ); 
  }

  createEvent(data: MyEventAttrs): Observable<any> {
    return this.http.post(this.baseUrl + this.eventControllerPath, data);
  }

  deleteEvent(id: number): Observable<CRUDResponse> {
    let httpParams = new HttpParams().set('eventId', id.toString());
    httpParams.set('eventId', id.toString());
    let options = { params: httpParams };
    return this.http.delete<CRUDResponse>(this.baseUrl + this.eventControllerPath, options);
  }
}
