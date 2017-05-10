import { Component, OnInit, Input } from '@angular/core';
import { Menu } from './menu';
import { Language } from '../language-selector/language';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  items: Menu[];

  @Input()
  languages: Language[];

  ngOnInit() { }

  constructor() { }
}
