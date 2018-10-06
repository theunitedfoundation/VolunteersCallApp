import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddeventPage } from '../addevent/addevent';
import { EventItem } from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AuthService} from '../../services/auth'
import { Observable } from 'rxjs';
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

  constructor(private authService:AuthService,private database: AngularFireDatabase,public navCtrl: NavController,private actionSheetCtrl: ActionSheetController, public navParams: NavParams) {
    
    this.eventListRef$ = this.database.list('eventlist').valueChanges();
    
  }

  onSelectEvent(){
    this.actionSheetCtrl.create()
  }
  goToAddEvent() {
    this.navCtrl.push(AddeventPage);
  }
  onLogOut(){
    this.authService.logOut();
  }
}
