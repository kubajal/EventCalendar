import { Component, OnInit } from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }
  eventsList = Array<Event>();

  model = new Event('Event name', 'Date time', 'Place name', 'Descrption');
  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.eventsList.push(this.model);
  }
  ngOnInit() {
  }

}
