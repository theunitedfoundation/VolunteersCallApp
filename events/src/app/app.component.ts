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

  constructor(private authService:AuthService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyD_8CkpNmdpzQacmLD2vDmB8IrFCHkefrc",
     authDomain: "volunteercall-a2de1.firebaseapp.com",
     databaseURL: "https://volunteercall-a2de1.firebaseio.com",
     projectId: "volunteercall-a2de1",
     storageBucket: "volunteercall-a2de1.appspot.com",
     messagingSenderId: "333057397510"
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
}
