import { Component, OnInit } from '@angular/core';
import { AttendData } from './attend-data';
import { AttendService } from './attend.service';
import { CRUDResponse } from '../CRUDResponse';

@Component({
  selector: 'app-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.css']
})
export class AttendComponent implements OnInit {
  isSuccess: boolean;
  message: string;
  opened: boolean;

  constructor(private attendService: AttendService) { }

  public attendedEvents: AttendData[] = Array<AttendData>();

  get(): void {
    this.attendService.getAttendData().subscribe(attendDataFromApi => {
      for (const attendData of (attendDataFromApi as Array<AttendData>)) {
        this.attendedEvents.push({
          eventId: attendData.eventId,
          eventName: attendData.eventName
        });
      }
    });
  }

  unattend(eventId: number) {
    this.attendService.unattend(eventId)
      .subscribe(
        (value) => {
          this.message = value.message;
          this.isSuccess = value.isSuccess;
          this.opened = true;
          if (value.isSuccess)
            this.attendedEvents = this.attendedEvents.filter(e => e.eventId !== eventId);
        },
        (err) => {
          const response: CRUDResponse = err.error;
          this.message = response.message;
          this.isSuccess = response.isSuccess;
          this.opened = true;
        }
      );
  }

  ngOnInit() {
    this.attendService.getAttendData()
    .subscribe(
      (value) => {
        this.attendedEvents = value
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

}
