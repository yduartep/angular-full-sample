import {Component, OnInit, AfterViewInit, Inject, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {UIFormComponent} from '../../ui-elements/ui-form';
import {ValidationService} from '../../core/services/validation.service';
import {Mode} from '../../core/models/mode.enum';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../core/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends UIFormComponent implements OnInit {
  loading = false;
  username: string;
  password: string;
  mode = Mode.EDIT;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              private alertService: AlertService,
              @Inject('AuthService') private authService: AuthService,
              validation: ValidationService) {
    super(validation);
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  isLoginEnable() {
    return !this.loading && this.validate();
  }

  onLogin() {
    if (this.validate()) {
      this.doLogin();
    }
  }

  doLogin() {
    this.loading = true;
    this.authService.login(this.username, this.password)
      .subscribe(userData => {
        this.loading = false;

        // navigate to returnUrl just if login successfully
        if (userData.access_token) {
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
        } else {
          this.translate.get('login.error-no-token-sent').subscribe(msg => {
            this.alertService.error('login.error-no-token-sent', {}, msg);
          });
        }
      }, error => {
        this.translate.get('login.error-user-unauthorized').subscribe(msg => {
          this.alertService.error('login.error-user-unauthorized', {}, msg);
        });
        this.loading = false;
      });
  }
}
