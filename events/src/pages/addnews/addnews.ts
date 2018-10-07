import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
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
  constructor(public loadingCtrl: LoadingController,private filePath: FilePath,private fileChooser:FileChooser,private file: File,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewsPage');
  }
  
  chooseImage()
  {
    this.fileChooser.open().then((uri)=>{
      alert(uri);
      this.filePath.resolveNativePath(uri).then((filePath)=>{
        alert(filePath);
        let dirPathSegements = filePath.split('/');
        let fileName=dirPathSegements[dirPathSegements.length-1];
        dirPathSegements.pop();
        let dirPath = dirPathSegements.join('/');
        this.file.readAsArrayBuffer(dirPath,fileName).then(async (buffer)=>{
          await this.upload(buffer,fileName);
        }).catch((err)=>{
          alert(err.toString());
        });
      });
    });
  }

  async upload(buffer,name)
  {
    let blob = new Blob([buffer],{type:"image/jpeg"})
    let storage = firebase.storage();
    storage.ref('newsimages/'+name).put(blob).then((image)=>{
      alert("Done");
      alert(image.ref.getDownloadURL().then(img=>{
        
        this.downloadUrl = img.toString();
      }));
    }).catch((error)=>{
      alert(JSON.stringify(error));
    })
  }
}
