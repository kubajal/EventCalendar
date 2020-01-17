import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from './event.service';
import { MyEvent } from './event';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit{
  public events: MyEvent[] = Array<MyEvent>();

  constructor(private eventService: EventService, @Inject('BASE_URL') baseUrl: string) {
    //this.events = eventService.getEvents()
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(eventsFromApi => {
      for (const event of (eventsFromApi as Array <MyEvent>)) {
        this.events.push({
          eventId: event.eventId,
          description: event.description,
          name: event.name
        });
      }
    });

  }
}
