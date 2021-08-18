export class BaseService {

  public sistema: string = 'LOGIN SERNAPESCA';
  public url: string;
  public urlLogin: string;

  constructor() {
    this.url = '';  //url del servidor
    this.urlLogin = this.url + ''; // Url de la api
  }
}
