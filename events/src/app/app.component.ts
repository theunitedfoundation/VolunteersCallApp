import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { EventlistPage } from '../pages/eventlist/eventlist';
import { SigninPage } from '../pages/signin/signin';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyA66h4aPIsyZ94M_cruTO8XWJb8yw4kb0c",
      authDomain: "eventsapp-1b654.firebaseapp.com",
      databaseURL: "https://eventsapp-1b654.firebaseio.com",
      projectId: "eventsapp-1b654",
      storageBucket: "eventsapp-1b654.appspot.com",
      messagingSenderId: "1036477319226"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

