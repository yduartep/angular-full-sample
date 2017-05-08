import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from '../shared/hero';
import { Editorial } from '../shared/editorial.enum';
import { HeroService } from '../shared/hero.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.findById(+params['id']).subscribe((hero: Hero) => {
        hero['editorialText'] = Editorial[hero.editorial];
        this.hero = hero;
      });
    });
  }

  delete(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this Super Hero?');
    if (confirmation) {
      this.service.delete(id).subscribe(res => {
        if (res.ok) {
          this.router.navigate(['/heroes']);
        } else {
          alert('Couldn\'t delete 💩');
        }
      });
    }
  }
}
