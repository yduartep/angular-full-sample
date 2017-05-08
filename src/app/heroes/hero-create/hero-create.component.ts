import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../shared/hero';
import { Editorial } from '../shared/editorial.enum';
import { HeroService } from '../shared/hero.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent {
  errorMessage: string;
  heroForm: FormGroup;
  selectedEditorial: number = -1;
  editorials = [{ id: -1, value: 'Select value ...' }, { id: 1, value: 'Marvel' }, { id: 2, value: 'DC' }];

  constructor(
    private fb: FormBuilder,
    private service: HeroService,
    private router: Router) {
    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      editorial: ['', ValidationService.positiveNumberValidator],
      image: []
    });
  }

  isInvalid(control): boolean {
    return control && control.touched && !control.valid;
  }

  errorClass(control): any {
    const condition = this.isInvalid(control);
    return {
      'has-error': condition,
      'has-feedback': condition
    };
  }

  saveHero() {
    this.errorMessage = null;
    const hero = new Hero(null,
      this.heroForm.value.name,
      this.heroForm.value.editorial,
      this.heroForm.value.image);

    this.service.insert(hero).subscribe(res => {
      if (res.ok) {
        this.router.navigate(['/heroes']);
      } else {
        this.errorMessage = 'Error while trying to insert the new super hero';
      }
    });
  }

  reset() {
    this.heroForm.reset();
  }

}
