import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNewslistPage } from './admin-newslist';

@NgModule({
  declarations: [
    AdminNewslistPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminNewslistPage),
  ],
})
export class AdminNewslistPageModule {}
