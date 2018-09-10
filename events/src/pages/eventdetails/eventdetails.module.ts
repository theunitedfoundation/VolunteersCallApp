import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventdetailsPage } from './eventdetails';

@NgModule({
  declarations: [
    EventdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventdetailsPage),
  ],
})
export class EventdetailsPageModule {}
