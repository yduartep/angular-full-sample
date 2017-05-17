export class Task {
  id: number;
  description: string;
  key: string;
  formKey: string;
  assignee: string;
  creationDate: Date;

  constructor(id: number, description: string, key: string, formKey: string, assignee: string, creationDate: Date) {
    this.id = id;
    this.description = description;
    this.key = key;
    this.formKey = formKey;
    this.assignee = assignee;
    this.creationDate = creationDate;
  }
}
