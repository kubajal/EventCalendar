import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AttendDataAttrs, AttendData } from './attend-data';
import { CRUDResponse } from '../CRUDResponse';

@Injectable({
  providedIn: 'root'
})

export class AttendService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('ATTEND_CONTROLLER') private attendControllerPath: string) {
    this.baseUrl = baseUrl;
  }

  getAttendData(): Observable<AttendData[]> {
    return this.http.get<AttendDataAttrs[]>(this.baseUrl + this.attendControllerPath).pipe(
      map((result) => result.map((myEventAttrs) => new AttendData(myEventAttrs)))
    );
  }
  createAttendance(id: number): Observable<any> {
    return this.http.post(this.baseUrl + this.attendControllerPath, id);
  }
  unattend(id: number): Observable<any> {
    let httpParams = new HttpParams().set('eventId', id.toString());
    httpParams.set('eventId', id.toString());
    let options = { params: httpParams };
    return this.http.delete<CRUDResponse>(this.baseUrl + this.attendControllerPath, options);
  }
}
