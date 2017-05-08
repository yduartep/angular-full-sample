import { Component, OnInit } from '@angular/core';

@Component({
  styleUrls: ['./villains.component.css'],
  template: `<router-outlet></router-outlet>`
})
export class VillainsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('... Initializing Villains component');
  }

}
