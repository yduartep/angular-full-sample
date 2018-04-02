import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../core/alert/alert.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  username: string;
  password: string;
  frmLogin: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              private alertService: AlertService,
              @Inject('AuthService') private authService: AuthService,
              private fb: FormBuilder) {

    this.frmLogin = this.fb.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  onLogin() {
    if (!this.frmLogin.invalid) {
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
