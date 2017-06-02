import {Component, OnInit} from '@angular/core';
// import slide in/out animation
import {slideInOutAnimation} from '../../_animations/index';
import {ProcessDefinitionService} from '../shared/process-definition.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'process-definition-image.component.html',
  styleUrls: ['./process-definition-children.component.css'],

  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],

  // attach the slide in/out animation to the host (root) element of this component
  host: {'[@slideInOutAnimation]': ''}
})

export class ProcessDefinitionImageComponent implements OnInit {
  image: any;

  constructor(private service: ProcessDefinitionService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.getImage(this.route.snapshot.params['id']).subscribe((image: any) => {
      this.image = image;
    });
  }
}
