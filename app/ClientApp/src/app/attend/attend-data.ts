export interface AttendDataAttrs {
  eventId: number;
  eventName: string;
}

export class AttendData {

  eventId: number;
  eventName: string;
  
  constructor(attrs: Partial<AttendData> = {}) {
    this.eventId = attrs.eventId;
    this.eventName = attrs.eventName;
  }
}
