import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { EventlistPage } from '../pages/eventlist/eventlist';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { settingsPage } from '../pages/settings/settings';
import { NewsPage } from '../pages/news/news';
// import { AddeventPage } from '../pages/addevent/addevent';
// import {EventdetailsPage} from '../pages/eventdetails/eventdetails';
import { ProfilePage } from '../pages/profile/profile';
import {AuthService} from '../services/auth'
import { ENV } from '../environments/environment.dev';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild (Nav) nav: Nav; //can't inject nav controller in the constructor in the root component
  rootPage:any = EventlistPage;
  eventsListPage=EventlistPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;

  show: boolean = false;
  pages: Array<{title: string, component: any,icon:string}>;
  constructor(private authService:AuthService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(ENV
      );
    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        this.isAuthenticated = true;
        this.rootPage=EventlistPage;//as firebase checks the user state asynchronously before the nav gets initialized
        this.show = true;
      } else {
        this.isAuthenticated = false;
        this.rootPage=SigninPage;
      }
      if(!this.isAuthenticated){

        //this.rootPage=SigninPage;
       this.pages = [
          { title: 'SignIn', component: SigninPage , icon: "log-in"},
          { title: 'Register', component: SignupPage, icon: "book"}
        ];
      }else{
        this.pages = [
          { title: 'news', component: NewsPage, icon: "paper"},
          { title: 'events', component: EventlistPage, icon: "albums" },
          { title: 'profile', component: ProfilePage , icon: "person"},
          { title: 'settings', component: settingsPage, icon: "settings"}



        ];
      }

    });


    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#000000');
    }
      splashScreen.hide();
    });
  }

  onLogOut(){
    this.authService.logOut();
    this.show = false;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage=page.component
    //this.nav.setRoot(page.Component);
  }
}
