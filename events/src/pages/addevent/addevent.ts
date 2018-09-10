import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventItem } from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
/**
 * Generated class for the AddeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddeventPage {
   eventItem = {} as EventItem;

   eventItemRef$ : AngularFireList<EventItem> 
  constructor(private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

    this.eventItemRef$ = this.database.list('eventlist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddeventPage');
  }

  addEvent(eventItem: EventItem){

    console.log(eventItem);
    this.eventItemRef$.push({
      
      eventName: this.eventItem.eventName,
      eventDescription: this.eventItem.eventDescription,
      venue: this.eventItem.venue,
      dateTime: this.eventItem.dateTime,
      volunteersNeeded:Number(this.eventItem.volunteersNeeded),
      phone:Number(this.eventItem.phone),
      email: this.eventItem.email


    });

    this.eventItem = {} as EventItem;
     
    this.navCtrl.pop();

  }

}
