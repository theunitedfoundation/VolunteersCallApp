import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthService, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }
  reset() {
    // let alert = this.alertCtrl.create({
    //   buttons: ['Ok']
    // });
    this.authService.passwordreset(this.email).then((res: any) => {
      
        // alert.setTitle('Email Sent');
        // alert.setSubTitle('Please follow the instructions in the email to reset your password');
        alert("Password Reset Email Sent Successfully")
      
    }).catch((err) => {
      alert("Failed to reset password");
      // alert.setSubTitle(err);
    })
  }

  goback() {
    this.navCtrl.pop();
  }
}
