import { Component, OnInit, Input } from '@angular/core';
import { MyEvent } from '../myEvent';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: MyEvent;

  constructor() { }

  ngOnInit() {
  }

}
