import { Component, OnInit } from '@angular/core';
import { EventService } from '../fetch-data/event.service';
import { MyEvent } from '../fetch-data/event';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Observable } from 'rxjs';
import { AttendService } from '../attend/attend.service';
import { CRUDResponse } from '../CRUDResponse';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events: MyEvent[] = Array<MyEvent>();
  public isAuthenticated: Observable<boolean> = null;
  public message: string = null;
  public opened = false;
  public isSuccess: boolean = null;
  form: FormGroup;

  constructor(private eventService: EventService,
    private attendService: AttendService,
    private authorizeService: AuthorizeService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(eventsFromApi => {
      for (const event of (eventsFromApi as Array<MyEvent>)) {
        this.events.push({
          eventId: event.eventId,
          description: event.description,
          name: event.name,
          date: event.date,
          pathToImage: event.pathToImage
        });
      }
    });
    this.isAuthenticated = this.authorizeService.isAuthenticated();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    });
  }
  

  attend(id: number) {
    this.attendService.createAttendance(id)
      .subscribe(
        (value: CRUDResponse) => {
          this.message = value.message;
          this.isSuccess = value.isSuccess;
          this.opened = true;
        },
        (err) => {
          const response: CRUDResponse = err.error;
          this.message = response.message;
          this.isSuccess = response.isSuccess;
          this.opened = true;
        }
      );
  }

  create() {
    const event = this.form.value;
    this.eventService.createEvent(event)
      .subscribe(
        (value: CRUDResponse) => {
          this.message = 'Event has been succesfully created';
          this.isSuccess = value.isSuccess;
          event.eventId = value.message.toString();
          this.opened = true;
          if (value.isSuccess) {
           this.events.push(new MyEvent(event));
          }
        },
        (err) => {
          const response: CRUDResponse = err.error;
          this.message = response.message;
          this.isSuccess = response.isSuccess;
          this.opened = true;
        }
      );
  }

}
