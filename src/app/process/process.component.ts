import { Component, OnInit } from '@angular/core';

@Component({
  styleUrls: ['./process.component.css'],
  template: `<router-outlet></router-outlet>`
})
export class ProcessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('... Initializing Process component');
  }

}
