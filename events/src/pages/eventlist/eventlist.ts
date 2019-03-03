import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddeventPage } from '../addevent/addevent';
import { EventItem } from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AuthService} from '../../services/auth'
import { Observable } from 'rxjs';
import { SigninPage } from '../signin/signin';
import {EventdetailsPage} from '../eventdetails/eventdetails';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

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

  constructor(private authService:AuthService,private database: AngularFireDatabase,
    private launchNavigator: LaunchNavigator, public navCtrl: NavController,private actionSheetCtrl: ActionSheetController, public navParams: NavParams) {
    
    // this.eventListRef$ = this.database.list('eventlist').valueChanges();
    
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
  LaunchMap(venue){
    this.launchNavigator.navigate(venue)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
   }
  
 // onLogOut(){
   // this.authService.logOut();
   // this.navCtrl.push(SigninPage);
 // }
}
