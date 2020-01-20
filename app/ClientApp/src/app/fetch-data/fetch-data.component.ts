import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from './event.service';
import { MyEvent } from './event';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CRUDResponse } from './CRUDResponse';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit{
  public events: MyEvent[] = Array<MyEvent>();

  public message: string = null;
  public opened: boolean = false;
  public isSuccess: boolean = null;
  form: FormGroup;
  disabaleBtn = false;

  constructor(
    private eventService: EventService,
    @Inject('BASE_URL') baseUrl: string) {
    //this.events = eventService.getEvents()
  }
  
  private paths: Array<string> = ["fruit", "kookaburra", "orange", "tree"]

  ngOnInit() {
    this.eventService.getEvents().subscribe(eventsFromApi => {
      for (const event of (eventsFromApi as Array <MyEvent>)) {
        this.events.push({
          eventId: event.eventId,
          description: event.description,
          name: event.name,
          pathToImage: "assets/" + this.paths[Math.floor(Math.random() * 4)] + ".jpg"
        });
      }
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  create() {
    this.disabaleBtn = true;
    let event = this.form.value;
    this.eventService.createEvent(event)
    .subscribe(
      (value: CRUDResponse) => 
      {
        this.message = "Event has been succesfully created";
        this.isSuccess = value.isSuccess;
        event.eventId = value.message.toString();
        this.opened = true;
        if(value.isSuccess)
          this.events.push(new MyEvent(event));
      },
      (err) => 
      {
        let response: CRUDResponse = err.error;
        this.message = response.message;
        this.isSuccess = response.isSuccess;
        this.opened = true;
      }
    );
    this.disabaleBtn = false;
  }

  delete(id: number) {
    this.eventService.deleteEvent(id)
    .subscribe(
      (value) => 
      {
        this.message = value.message;
        this.isSuccess = value.isSuccess;
        this.opened = true;
        if(value.isSuccess)
          this.events = this.events.filter(e => e.eventId != id);
      },
      (err) => 
      {
        let response: CRUDResponse = err.error;
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
}
