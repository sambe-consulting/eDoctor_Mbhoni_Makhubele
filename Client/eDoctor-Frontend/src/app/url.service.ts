import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  url = 'http://localhost:5000/';

  constructor() {}

  getUrl() {
    return this.url;
  }
}
