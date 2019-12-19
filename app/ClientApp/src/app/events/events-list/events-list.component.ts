import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { MyEvent } from '../myEvent';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  @Input() eventsListInput: MyEvent[];

  eventsList = Array<MyEvent>();
  constructor(private eventService: EventService) { }

  // ngOnInit() {
  //   this.eventService.getEvents().subscribe({
  //     next: (events) => this.eventsList = events,
  //     error: () => alert('Nie udało się pobrać wydarzeń')
  //   });
  // }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      for (const e of (events as Array<MyEvent>)) {
        this.eventsList.push({
          name: e.name,
          place: e.place,
          date: e.date,
          description: e.description
        });
      }
    });
  }

}
