import { Component,ViewChild, Injectable  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth';
import { EventlistPage } from '../eventlist/eventlist';
import { Http, Response } from "@angular/http";
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
  @ViewChild('password') password;
  constructor(private http:Http, private alertCtrl:AlertController,private loadCtrl: LoadingController, private authService: AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  onSignUp(form:NgForm){
    let loading = this.loadCtrl.create({
      content: 'Creating user...'
    });
  
    loading.present();
    console.log(this.password.value);
    console.log(form.value.email);
    this.authService.signUp(form.value.email,this.password.value)
    .then(data=>{

      console.log(data);
      loading.dismiss();
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
