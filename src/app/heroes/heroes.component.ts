import { Component, OnInit } from '@angular/core';

@Component({
  styleUrls: ['./heroes.component.css'],
  template: `<router-outlet></router-outlet>`
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('... Initializing Heroes component');
  }

}
