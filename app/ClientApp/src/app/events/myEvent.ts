export interface MyEventAttrs {
    name: string;
    date: string;
    place: string;
    description: string;

}

export class MyEvent {

    public name: string;
    public date: string;
    public place: string;
    public description: string;

    constructor(attrs: Partial<MyEventAttrs> = {}) {
        this.name = attrs.name;
        this.date = attrs.date;
        this.place = attrs.place;
        this.description = attrs.description;
    }
}
