import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddnewsPage } from './addnews';

@NgModule({
  declarations: [
    AddnewsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddnewsPage),
  ],
})
export class AddnewsPageModule {}
