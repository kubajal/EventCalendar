export interface MyEventAttrs {
  eventId: number;
  name: string;
  description: string;
  pathToImage: string;
  date: Date;
}

export class MyEvent {

  eventId: number;
  name: string;
  description: string;
  pathToImage: string = null;
  date: Date;

  constructor(attrs: Partial<MyEventAttrs> = {}) {
    this.eventId = attrs.eventId;
    this.description = attrs.description;
    this.name = attrs.name;
    this.pathToImage = attrs.pathToImage;
    this.date = attrs.date;
  }
}
