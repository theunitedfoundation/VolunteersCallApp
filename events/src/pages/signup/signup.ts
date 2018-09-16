import { Component,ViewChild, Injectable  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth';
import { EventlistPage } from '../eventlist/eventlist';
import { Http, Response } from "@angular/http";
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { auth } from '../../../node_modules/firebase';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public name : string;
  public email : string;
  public phone : number; 
  public gender : any;
  public profession : any;
  public userProfile: any;
 
  
  @ViewChild('password') password;
  constructor(private http:Http, private alertCtrl:AlertController,private loadCtrl: LoadingController, private authService: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.userProfile = firebase.database().ref('volunteers');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  onSignUp(form:NgForm){
    var volunteerdetails = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      gender: form.value.gender,
      profession: form.value.profession
    };
    let loading = this.loadCtrl.create({
      content: 'Creating user...'
    });
  
    loading.present();
   
    console.log(form.value.email);
    this.authService.signUp(form.value.email,this.password.value)
    .then(data=>{

      console.log(data);
      loading.dismiss();
      console.log(this.authService.getActiveUser().uid);
      this.userProfile.child(this.authService.getActiveUser().uid).set(
        volunteerdetails
      );
      this.navCtrl.push(EventlistPage);
      
      })
    .catch(error=>{
      loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
    });

  }
} 
