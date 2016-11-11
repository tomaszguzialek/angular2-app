import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public email: string;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    gapi.signin2.render('sign-in-with-google-btn', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': param => {
          this.ngZone.run(() => this.onGoogleSignIn(param));
        }
    });
  }

  public onGoogleSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    this.email = profile.getEmail();
  }

  public signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.email = null;
      });
    });
  }
}
