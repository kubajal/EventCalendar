export interface MyEventAttrs {
  eventId: number;
  name: string;
  description: string;

}

export class MyEvent {

  eventId: number;
  name: string;
  description: string;

  constructor(attrs: Partial<MyEventAttrs> = {}) {
    this.eventId = attrs.eventId;
    this.description = attrs.description;
    this.name = attrs.name;
  }
}
