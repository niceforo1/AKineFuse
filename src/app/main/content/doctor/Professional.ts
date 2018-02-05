import {Phone} from './phone';

export class Professional {
  public _id: string;
  public id: string;
  public name: string;
  public lastName: string;
  public birthDate: Date;
  public gender: string;
  public email: string;
  public picture: string;

  public license: string;
  public specialities: string;
  public phones : Phone;
  constructor() {
    this.phones = new Phone();
    this.phones.main = true;
    this.phones.type = "Celular";
  }
}