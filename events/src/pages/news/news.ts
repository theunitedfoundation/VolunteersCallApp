import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  newsListRef$ : Observable<any[]>

  constructor(private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.newsListRef$ = this.database.list('newslist').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
