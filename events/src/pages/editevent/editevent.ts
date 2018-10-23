import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import firebase from 'firebase';
import { Http, Response } from "@angular/http";
import {AuthService} from '../../services/auth';
/**
 * Generated class for the EditeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
})
export class EditeventPage {
  eventItem =
  {
    // eventName:'',
    // eventDescription:'',
    // date:'',
    // time:'',
    // phone:'',
    // email:'',
    // volunteersneeded:'',
    // venue:'',
    // key:''
    eventName:this.navParams.get('eventName'),
    eventDescription:this.navParams.get('eventDescription'),
    date:this.navParams.get('date'),
    time:this.navParams.get('time'),
    phone:this.navParams.get('phone'),
    email:this.navParams.get('email'),
    volunteersneeded:this.navParams.get('volunteersneeded'),
    venue:this.navParams.get('venue'),
    key:this.navParams.get('key')

  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }
  // eventName= this.navParams.get('eventName');
  // eventDescription= this.navParams.get('eventDescription');
  // date= this.navParams.get('date');
  // time= this.navParams.get('time');
  // phone= this.navParams.get('phone');
  // email= this.navParams.get('email');
  // volunteersneeded= this.navParams.get('volunteersneeded');
  // venue= this.navParams.get('venue');
  // key=this.navParams.get('key');

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditeventPage');
    console.log(this.navParams.get('key'));
  }
  editEvent(eventItem){
    firebase.database().ref('eventlist/'+this.eventItem.key).set({
      eventName: this.eventItem.eventName,
      eventDescription: this.eventItem.eventDescription,
      venue: this.eventItem.venue,
      date: this.eventItem.date,
      time:this.eventItem.time,
      volunteersNeeded:Number(this.eventItem.volunteersneeded),
      phone:Number(this.eventItem.phone),
      email: this.eventItem.email,
      key:this.eventItem.key
    });
    alert('Updated Event')
  }

  deleteEvent(eventItem){
    firebase.database().ref('eventlist/'+this.eventItem.key).remove();
    alert('Deleted Event')
    this.navCtrl.pop();
  }
}
