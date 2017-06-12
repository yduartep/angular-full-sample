import {Component, OnInit} from "@angular/core";
// import slide in/out animation
import {slideInOutAnimation} from "../../_animations/index";
import {ProcessService} from "../../shared/service/process.service";
import {ProcessDetailComponent} from "./process-detail.component";


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'process-detail-image.component.html',
  styleUrls: ['./process-detail-children.component.css'],

  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],

  // attach the slide in/out animation to the host (root) element of this component
  host: {'[@slideInOutAnimation]': ''}
})

export class ProcessDetailImageComponent implements OnInit {
  image: any;

  constructor(private service: ProcessService, private parent: ProcessDetailComponent) {
  }

  ngOnInit() {
    this.service.getImage(this.parent.route.snapshot.params['id']).subscribe((image: any) => {
      this.image = image;
    });
  }
}
