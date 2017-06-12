import {Component, OnInit} from '@angular/core';
// import slide in/out animation
import {slideInOutAnimation} from '../../_animations/index';
import {ProcessService} from '../../shared/service/process.service';
import {Process} from '../../shared/domain/process';
import {ProcessDetailComponent} from './process-detail.component';
import {PrettyJsonComponent} from 'angular2-prettyjson';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'process-detail-variables.component.html',
  styleUrls: ['./process-detail-children.component.css'],

  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],

  // attach the slide in/out animation to the host (root) element of this component
  host: {'[@slideInOutAnimation]': ''}
})

export class ProcessDetailVariablesComponent implements OnInit {
  processVariables: any;

  constructor(private service: ProcessService, private parent: ProcessDetailComponent) {
  }

  ngOnInit() {
    this.service.findById(this.parent.route.snapshot.params['id']).subscribe((process: Process) => {
      this.processVariables = process.processVariables;
    });
  }
}
