import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import firebase from 'firebase';
import { Http, Response } from "@angular/http";
import {AuthService} from '../../services/auth';
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
  public uid:String;
  public userName: any;
  public userEmail:any;
  public userPhone: any;
  // public userGender:any;
  // public userProfession:any;
  constructor(private authService: AuthService,public navCtrl: NavController, public navParams: NavParams) {
    this.uid=this.authService.getActiveUser().uid;
    firebase.database().ref('volunteers/'+this.uid).once('value').then((snapshot) =>{
      
      this.userName=snapshot.val().name;
       this.userEmail=snapshot.val().email;
       //this.userGender=snapshot.val().gender;
       this.userPhone=snapshot.val().phone;
       //this.userProfession=snapshot.val().profession;
    });
  }
    eventName= this.navParams.get('eventName');
    eventDescription= this.navParams.get('eventDescription');
    date= this.navParams.get('date');
    time= this.navParams.get('time');
    phone= this.navParams.get('phone');
    email= this.navParams.get('email');
    volunteersneeded= this.navParams.get('volunteersneeded');
    venue= this.navParams.get('venue');
    key=this.navParams.get('key');
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventdetailsPage');
    console.log(this.navParams.get('venue'));
    console.log(this.navParams.get('key'));
  }

  Signevent(){
    firebase.database().ref('eventlist/'+this.key+'/registrations/'+this.uid).set({
         volName:this.userName,
         volPhone:this.userPhone,
         volEmail:this.userEmail
    });
    alert("Thanks for signing up for the event")
  }

}