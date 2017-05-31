import { Component, OnInit } from '@angular/core';

import { fadeInNewAnimation } from '../_animations/index';


@Component({
  moduleId: module.id.toString(),
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],

  // make fade in animation available to this component
  animations: [fadeInNewAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInNewAnimation]': '' }
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
