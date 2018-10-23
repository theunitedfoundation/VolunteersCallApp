import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class EventdetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
    eventName= this.navParams.get('eventName');
    eventDescription= this.navParams.get('eventDescription');
    date= this.navParams.get('date');
    time= this.navParams.get('time');
    phone= this.navParams.get('phone');
    email= this.navParams.get('email');
    volunteersneeded= this.navParams.get('volunteersneeded');
    venue= this.navParams.get('venue');

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventdetailsPage');
    console.log(this.navParams.get('venue'));
  }

  Signevent(){
    alert("Thanks for signing up");
  }

}