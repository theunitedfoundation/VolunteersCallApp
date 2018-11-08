import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../services/auth';
import firebase from 'firebase';
import { Http, Response } from "@angular/http";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public uid:String;
  public userName: any;
  public userEmail:any;
  public userPhone: any;
  public userGender:any;
  public userProfession:any;
  public userRole:any;
  

  constructor(private authService: AuthService,public navCtrl: NavController, public navParams: NavParams) {
    
    this.uid = this.authService.getActiveUser().uid;
    //console.log(this.authService.getActiveUser().displayName);
    //console.log(this.uid)
    firebase.database().ref('volunteers/'+this.uid).once('value').then((snapshot) =>{
      
      this.userName=snapshot.val().name;
       this.userEmail=snapshot.val().email;
       this.userGender=snapshot.val().gender;
       this.userPhone=snapshot.val().phone;
       this.userProfession=snapshot.val().profession;
       this.userRole=snapshot.val().role || "user";
       console.log(this.userRole);
      // var email = (snapshot.val() && snapshot.val().email) || '';
      // console.log(email)
      // var phone = (snapshot.val() && snapshot.val().phone) || '';
      // console.log(phone)
      // var gender = (snapshot.val() && snapshot.val().gender) || '';
      // console.log(gender)
      // var profession = (snapshot.val() && snapshot.val().profession) || '';
      // console.log(profession)
      // ...
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
