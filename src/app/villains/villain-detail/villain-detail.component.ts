import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Villain } from '../shared/villain';
import { Editorial } from '../shared/editorial.enum';
import { VillainService } from '../shared/villain.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {
  villain: Villain;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VillainService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.findById(+params['id']).subscribe((villain: Villain) => {
        villain['editorialText'] = Editorial[villain.editorial];
        this.villain = villain;
      });
    });
  }

  delete(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this Villain?');
    if (confirmation) {
      this.service.delete(id).subscribe(res => {
        if (res.ok) {
          this.router.navigate(['/villains']);
        } else {
          alert('Couldn\'t delete this villain');
        }
      });
    }
  }
}
