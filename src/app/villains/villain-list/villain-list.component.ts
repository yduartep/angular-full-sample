import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Villain } from '../shared/villain';
import { Editorial } from '../shared/editorial.enum';
import { VillainService } from '../shared/villain.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { LoggerService } from '../../core/services/logger.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit {
  public isRequesting = false;
  data: Villain[];

  constructor(
    private loggerService: LoggerService,
    private service: VillainService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.loggerService.log('... initializing Villain list component.');
    this.isRequesting = true;

    this.service.findAll()
      .subscribe(villaines => {
        this.data = villaines.map(villain => {
          villain['editorialText'] = Editorial[villain.editorial];
          return villain;
        });
      });
  }

  delete(id: number) {
    const confirmation = window.confirm('Are you sure you want to delete this Villain?');
    if (confirmation) {
      this.service.delete(id).subscribe(res => {
        if (res.ok) {
          const index = this.data.findIndex(villain => villain.id === id);
          this.data.splice(index, 1);
        }
      });
    }
  }

  onSearchText(result: Villain[]) {
    this.data = result;
  }
}
