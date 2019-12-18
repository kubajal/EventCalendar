import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }
  eventsList = Array<Event>();
  form: FormGroup;

  submitted = false;
  save() {
    this.submitted = true;
    const event = this.form.value;
    this.eventsList.push(event);
    console.log('this.form.value' + this.form.value);
    console.log('lista eventów' + this.eventsList);
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
