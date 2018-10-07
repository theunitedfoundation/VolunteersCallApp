import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { EventlistPage } from '../pages/eventlist/eventlist';
import { AddeventPage } from '../pages/addevent/addevent';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { settingsPage } from '../pages/settings/settings';
import { NewsPage } from '../pages/news/news';
import {EventdetailsPage} from '../pages/eventdetails/eventdetails';
import { ProfilePage } from '../pages/profile/profile';
import { FormsModule } from '../../node_modules/@angular/forms';
import { AuthService } from '../services/auth';
import { ENV } from '../environments/environment.dev'

@NgModule({
  declarations: [
    MyApp,
    EventdetailsPage,
    EventlistPage,
    AddeventPage,
    SigninPage,
    SignupPage,
    settingsPage,
    NewsPage,
    ProfilePage
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(ENV),
    AngularFireDatabaseModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventdetailsPage,
    EventlistPage,
    AddeventPage,
    SigninPage,
    SignupPage,
    settingsPage,
    NewsPage,
    ProfilePage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
