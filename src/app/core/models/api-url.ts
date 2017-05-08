export class ApiUrl {
  id: string;
  url: string;
  requireAuth: boolean;
  constructor(id: string, url: string, requireAuth: boolean){
    this.id = id;
    this.url = url;
    this.requireAuth = requireAuth;
  }
}
