import { Component, OnInit, Input } from '@angular/core';
import { Menu } from './menu';
import { Language } from '../language-selector/language';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  items: Menu[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    if (!this.items || this.items.length === 0) {
      this.menuService.getData().subscribe(data => {
        this.items = data;
      });
    }
  }
}
