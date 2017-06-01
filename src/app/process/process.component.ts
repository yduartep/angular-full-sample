import { Component, OnInit } from '@angular/core';

import { fadeInAnimation } from '../_animations/index';

@Component({
  moduleId: module.id.toString(),
  styleUrls: ['./process.component.css'],
  template: `<router-outlet></router-outlet>`,

  // make fade in animation available to this component
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class ProcessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('... Initializing Process component');
  }

}
