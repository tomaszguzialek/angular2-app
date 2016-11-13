import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public email: string;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    gapi.load('auth2', () => this.onAuthInitialized());
  }

  public signIn() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      this.updateSigninStatus();
    });
  }

  public signOut() {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      this.updateSigninStatus();
    });
  }

  private onAuthInitialized() {
    gapi.auth2.init({
      client_id: '440406213380-57tebmtush3io9hnnqmjhm7rpv0mipsc.apps.googleusercontent.com',
      scope: 'profile'
    }).then(() => {
      this.updateSigninStatus();
    });
  }

  private updateSigninStatus() {
    this.ngZone.run(() => {
      let user = gapi.auth2.getAuthInstance().currentUser.get();

      if (user.isSignedIn()) {
        this.email = user.getBasicProfile().getEmail();
      } else {
        this.email = null;
      }
    });
  }
}
