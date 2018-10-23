import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { NewsItem } from 'models/news-item/news-item.interface';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
/**
 * Generated class for the AddnewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addnews',
  templateUrl: 'addnews.html',
})
export class AddnewsPage {
  downloadUrl: string;
  newsItem = {} as NewsItem;

  newsItemRef$ : AngularFireList<NewsItem> 
  constructor(private database: AngularFireDatabase,public loadingCtrl: LoadingController,private filePath: FilePath,private fileChooser:FileChooser,private file: File,public navCtrl: NavController, public navParams: NavParams) {
    this.newsItemRef$ = this.database.list('newslist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewsPage');
  }
  
  chooseImage()
  { 
    // const loading = this.loadingCtrl.create({
    //   content: 'Selecting Image....'
    // });
    // loading.present();
    this.fileChooser.open().then((uri)=>{
      //alert(uri);
      this.filePath.resolveNativePath(uri).then((filePath)=>{
        //alert(filePath);
        let dirPathSegements = filePath.split('/');
        let fileName=dirPathSegements[dirPathSegements.length-1];
        dirPathSegements.pop();
        let dirPath = dirPathSegements.join('/');
        //loading.dismiss();
        this.file.readAsArrayBuffer(dirPath,fileName).then(async (buffer)=>{
          
          await this.upload(buffer,fileName);
        
        }).catch((err)=>{
          alert(err.toString());
          alert("Image not uploaded");
        });
      });
    });
  }

  async upload(buffer,name)
  {const loading = this.loadingCtrl.create({
    content: 'Uploading Image....'
  });
  loading.present();
    let blob = new Blob([buffer],{type:"image/jpeg"})
    let storage = firebase.storage();
    storage.ref('newsimages/'+name).put(blob).then((image)=>{
      //alert("Done");
      (image.ref.getDownloadURL().then(img=>{
        
        this.downloadUrl = img.toString();
      
       loading.dismiss();
       alert('Image Uploaded');
      }));
    }).catch((error)=>{
      alert(JSON.stringify(error));
    })
  }

  addNews(newsItem: NewsItem){
    const loading = this.loadingCtrl.create({
      content: 'Adding News....'
    });
    console.log(newsItem);
    loading.present();
    this.newsItemRef$.push({
      
      newsTitle: this.newsItem.newsTitle,
      newsSubtitle: this.newsItem.newsSubtitle,
      newsBody: this.newsItem.newsBody,
      newsAuthor: this.newsItem.newsAuthor,
      newsPhotoUrl:this.downloadUrl,
      newsDate:this.newsItem.newsDate
      
    });
    loading.dismiss();
    this.newsItem = {} as NewsItem;
     
    this.navCtrl.popToRoot();

  }
}
