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
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { AddnewsPage } from '../pages/addnews/addnews';
import { FilePath } from '@ionic-native/file-path';
import { AdmineventslistPage } from '../pages/admineventslist/admineventslist';
import { AdminNewslistPage } from '../pages/admin-newslist/admin-newslist';
import { EditnewsPage } from '../pages/editnews/editnews';
import { EditeventPage } from '../pages/editevent/editevent';
import { ENV } from '../environments/environment.dev';
import { PasswordresetPage } from '../pages/passwordreset/passwordreset';
import { EventregistrationsPage } from '../pages/eventregistrations/eventregistrations';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';



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
    ProfilePage,
    AddnewsPage,
    AdmineventslistPage,
    AdminNewslistPage,
    EditeventPage,
    EditnewsPage,
    PasswordresetPage,
    EventregistrationsPage
   
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
    AddnewsPage,
    ProfilePage,
    AdmineventslistPage,
    AdminNewslistPage,
    EditeventPage,
    EditnewsPage,
    PasswordresetPage,
    EventregistrationsPage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    File,
    FilePath,
    FileChooser,
    CallNumber ,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
