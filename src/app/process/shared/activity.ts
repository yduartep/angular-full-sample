export class Activity {
  id: string;
  name: string;
  creationDate: Date;

  constructor(id: string, name: string, creationDate: Date) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
  }
}
