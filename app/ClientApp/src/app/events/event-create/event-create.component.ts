import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/fetch-data/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  constructor(private eventService: EventService) { }
  form: FormGroup;
  disabaleBtn = false;

  save() {
    this.disabaleBtn = true;
    const event = this.form.value;
    this.eventService.createEvent(event).subscribe();
    this.disabaleBtn = false;
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    }
    );
  }

}
