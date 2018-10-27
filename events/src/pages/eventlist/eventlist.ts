import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Platform, Nav, Icon,AlertController} from 'ionic-angular';
import { AddeventPage } from '../addevent/addevent';
import { EventItem } from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AuthService} from '../../services/auth'
import { Observable, from } from 'rxjs';
import { SigninPage } from '../signin/signin';
import {EventdetailsPage} from '../eventdetails/eventdetails';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import firebase from 'firebase';
/**
 * Generated class for the EventlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventlist',
  templateUrl: 'eventlist.html',
})
export class EventlistPage {
  username: String;

  eventListRef$ : Observable<any[]>

  constructor(private authService:AuthService,private database: AngularFireDatabase,public navCtrl: NavController,private actionSheetCtrl: ActionSheetController, public navParams: NavParams,private push: Push,public alertCtrl: AlertController,public platform: Platform) {
    
    this.eventListRef$ = this.database.list('eventlist').valueChanges();
    this.pushsetup();
    
  }

  onSelectEvent(){
    this.actionSheetCtrl.create()
  }
  goToAddEvent() {
    this.navCtrl.push(AddeventPage);
  }
  cardtapped(event){
    
    this.navCtrl.push(EventdetailsPage, {
      
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      date:event.date,
      time:event.time,
      phone:event.phone,
      email:event.email,
      volunteersneeded: event.volunteersNeeded,
      venue: event.venue,
      key:event.key

  });
  }
 // onLogOut(){
   // this.authService.logOut();
   // this.navCtrl.push(SigninPage);
 // }

 pushsetup() {

  // to check if we have permission
this.push.hasPermission()
.then((res: any) => {

  if (res.isEnabled) {
   alert('We have permission to send push notifications');
  } else {
    alert('We do not have permission to send push notifications');
  }

});


  if (!this.platform.is('cordova')) {
    console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
    return;
  }
  const options: PushOptions = {
    android: {
      senderID: 'xxxxxxxxxxxxx'// needs to be updated from firebase messaging settings and also in config.xml file 
    },
    ios: {
      alert: 'true',
      badge: false,
      sound: 'true'
    },
    windows: {}
  };
  const pushObject: PushObject = this.push.init(options);

  pushObject.on('registration').subscribe((data: any) => {
    console.log('device token -> ' + data.registrationId);
    alert(data.registrationId);
    firebase.database().ref('volunteers/'+this.authService.getActiveUser().uid).update({
      fcmtoken:data.registrationId
    })
  
    //TODO - send device token to server
  });

  pushObject.on('notification').subscribe((data: any) => {
    console.log('message -> ' + data.message);
    //if user using app and push notification comes
    if (data.additionalData.foreground) {
      // if application open, show popup
      let confirmAlert = this.alertCtrl.create({
        title: 'New Notification',
        message: data.message,
        buttons: [{
          text: 'Ignore',
          role: 'cancel'
        }, {
          text: 'View',
          handler: () => {
            //TODO: Your logic here
            this.navCtrl.push(EventlistPage, { message: data.message });
          }
        }]
      });
      confirmAlert.present();
    } else {
      //if user NOT using app and push notification comes
      //TODO: Your logic on click of push notification directly
      this.navCtrl.push(EventlistPage, { message: data.message });
      console.log('Push notification clicked');
    }
  });

  pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
}
}
