import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth';
import { EventlistPage } from '../eventlist/eventlist';
import {AddeventPage} from '../addevent/addevent'
import { NewsPage } from '../news/news';
import { AddnewsPage } from '../addnews/addnews';
import { AdmineventslistPage } from '../admineventslist/admineventslist';
import { AdminNewslistPage } from '../admin-newslist/admin-newslist';
/**
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController,private authService:AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
 goToRegister()
 {
   this.navCtrl.push(SignupPage);
 }
 goToAddEvent() {
  this.navCtrl.push(AddeventPage);
}
goToAddNews() {
  this.navCtrl.push(AddnewsPage);
}
goToAdminEventsList(){
  this.navCtrl.push(AdmineventslistPage);
}
goToAdminNewsList(){
  this.navCtrl.push(AdminNewslistPage);
}
 onSignIn(form:NgForm){
  const loading = this.loadingCtrl.create({
    content: 'Signing you in...'
  });
  loading.present();
  console.log(form.value);
  this.authService.signIn(form.value.email,form.value.password).then
  (data=>{
    loading.dismiss();
    this.navCtrl.push(EventlistPage);
  }).catch(error=>{loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Signin failed!',
      message: error.message,
      buttons: ['Ok']
    });
    alert.present();});
  

}
}
