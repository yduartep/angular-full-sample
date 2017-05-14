import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap';
import { ModalMessageComponent } from './modal-message.component';

describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [ModalMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
