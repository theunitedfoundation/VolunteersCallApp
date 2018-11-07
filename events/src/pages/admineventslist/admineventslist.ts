import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { EventItem } from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AuthService} from '../../services/auth'
import { Observable } from 'rxjs';
import { EditeventPage } from '../editevent/editevent';
import { EventregistrationsPage } from '../eventregistrations/eventregistrations';

/**
 * Generated class for the AdmineventslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admineventslist',
  templateUrl: 'admineventslist.html',
})
export class AdmineventslistPage {
  admineventListRef$ : Observable<any[]>
  constructor(private authService:AuthService,private database: AngularFireDatabase,public navCtrl: NavController,private actionSheetCtrl: ActionSheetController, public navParams: NavParams) {
    
    this.admineventListRef$ = this.database.list('eventlist').valueChanges();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmineventslistPage');
  }
  goToEditEvent(event){
      
    this.navCtrl.push(EditeventPage, {
      
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

  goToEventRegistrations(event){
    this.navCtrl.push(EventregistrationsPage, {
      
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
}
