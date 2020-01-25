import { Component, Inject, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { MyEvent } from './event';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CRUDResponse } from '../CRUDResponse';
import { AttendService } from '../attend/attend.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  public events: MyEvent[] = Array<MyEvent>();

  public message: string = null;
  public opened = false;
  public isSuccess: boolean = null;
  form: FormGroup;
  disabaleBtn = false;

  constructor(
    private eventService: EventService,
    private attendService: AttendService,
    private authorizeService: AuthorizeService,
    @Inject('BASE_URL') baseUrl: string) {
  }

  ngOnInit() {
    this.eventService.getEventsForUser().subscribe(eventsFromApi => {
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

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id)
      .subscribe(
        (value) => {
          this.message = value.message;
          this.isSuccess = value.isSuccess;
          this.opened = true;
          if (value.isSuccess) {
            this.events = this.events.filter(e => e.eventId !== id);
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

  public onToggle() {
    this.opened = false;
    this.message = null;
    this.isSuccess = false;
  }

  public isAuthenticated(): boolean {
    let test = false;
    // this.authorizeService.isAuthenticated().subscribe(e => test = e);        
    return test;
  }
}
