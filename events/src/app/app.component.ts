import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { EventlistPage } from '../pages/eventlist/eventlist';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import {AuthService} from '../services/auth'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild ('nav') nav: NavController; //can't inject nav controller in the constructor in the root component
  rootPage:any = EventlistPage;
  eventsListPage=EventlistPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  pages: Array<{title: string, component: any}>;
  constructor(private authService:AuthService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
"your firebase credentials"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        
        this.isAuthenticated = true;
        this.rootPage=EventlistPage;//as firebase checks the user state asynchronously before the nav gets initialized
      } else {
        this.isAuthenticated = false;
        this.rootPage=SigninPage;
      }
    });
    this.pages = [
      { title: 'SignIn', component: SigninPage },
      { title: 'Register', component: SignupPage}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLogOut(){
    this.authService.logOut();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
