import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../myEvent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  constructor(private eventService: EventService) { }
  form: FormGroup;

  save() {
    const event = this.form.value;
    this.eventService.createEvent(event);
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      place: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    }
    );
  }

}