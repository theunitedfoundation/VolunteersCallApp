import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventregistrationsPage } from './eventregistrations';

@NgModule({
  declarations: [
    EventregistrationsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventregistrationsPage),
  ],
})
export class EventregistrationsPageModule {}
