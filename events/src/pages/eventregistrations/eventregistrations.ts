import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AuthService} from '../../services/auth'
import { Observable } from 'rxjs';
/**
 * Generated class for the EventregistrationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventregistrations',
  templateUrl: 'eventregistrations.html',
})
export class EventregistrationsPage {
  eventItem =
  {
    
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
  eventregistrationsListRef$ : Observable<any[]>
  constructor(private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.eventregistrationsListRef$ = this.database.list('eventlist/'+this.eventItem.key+'/registrations').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventregistrationsPage');
    console.log(this.navParams.get('key'));
  }

}
