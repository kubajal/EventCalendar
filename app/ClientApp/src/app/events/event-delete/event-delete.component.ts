import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../fetch-data/event.service';

@Component({
  selector: 'app-event-delete',
  templateUrl: './event-delete.component.html',
  styleUrls: ['./event-delete.component.css']
})
export class EventDeleteComponent implements OnInit {
  form: FormGroup;

  constructor(private eventService: EventService) { }

  delete() {
    const eventId = this.form.value.eventId;
    this.eventService.deleteEvent(eventId);
  }

  ngOnInit() {
    this.form = new FormGroup({
      eventId: new FormControl(null, Validators.required)
    });
  }

}
